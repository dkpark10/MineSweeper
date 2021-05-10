'use strict';
declare function require(params: string): any;

import { Request, Response, NextFunction } from 'express';

const express: any = require('express');
const app: any = express();
const helmet: any = require('helmet');
const compression: any = require('compression');
const bodyparser: any = require('body-parser');
const session:any = require('express-session');
const fileStore:any = require('session-file-store')(session);
const path:any = require('path');
const fs:any = require('fs');

const port = 8080;
import { secret } from './secret/ptsession';
import * as idxrouter from './Router/ptidxrouter';

// app.use = 요청들어올 떄 마다 실행
app.use(session(secret)); // 세션값은 메모리에 저장 서버 재가동시 날아감 휘발성
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(compression());
app.use(helmet());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); 

app.use('/', idxrouter);
// app.use('/ranking', rankrouter);

app.use((request: Request, response:Response, next: NextFunction) => {
  response.render("notfound", {});
})

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error(error.stack);
  response.status(500).send('Something broke');
})

app.listen(port, () =>{
  console.log(`Waiting... ${port}`);
})
