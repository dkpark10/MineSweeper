// import { Request, Response, NextFunction } from 'express';

// declare function require(params: string): any;

// const express: any = require('express');
// const app: any = express();
// const helmet: any = require('helmet');
// const compression: any = require('compression');
// const bodyparser: any = require('body-parser');
// const config :any = require('./config/Jwtkey');
// const cors: any = require('cors');

// const port = process.env.PORT || 8080 ;

// app.use(cors());
// // app.use = 요청들어올 떄 마다 실행
// // app.use(session(secret)); // 세션값은 메모리에 저장 서버 재가동시 날아감 휘발성
// app.use(bodyparser.urlencoded({extended:false}));
// app.use(bodyparser.json());

// app.use(compression());
// app.use(helmet());

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.set('jwt-secretKey', config.secret);
// app.use(express.static(__dirname + '/public')); 
// app.use('/user');

// app.get('/', (request: Request, response : Response, next :NextFunction) => {
//   response.status(200).json({id:'ani sisisisi'});
// });

// app.post('/', (request: Request, response : Response, next :NextFunction) => {
//   const {id, pwd} = request.body;
//   console.log(id,pwd);
//   response.status(200).json({id:'12345'});
// });

// app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
//   console.error(error.stack);
//   response.status(500).send('Something broke');
// })

// app.listen(port, () =>{
//   console.log(`Waiting... ${port}`);
// })

import express, { Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import helmet, { contentSecurityPolicy } from 'helmet';
import compression from 'compression';
import shortid from 'shortid';
import sanitize from 'sanitize-html';
import cors from 'cors';
import apiroute from './routes/api';
import db from './models/User';

const app: express.Application = express();
const port: string = process.env.PORT || '8080';

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', apiroute);

app.get('/', async (request: Request, response: Response, next: NextFunction) => {

  var dirtylist = [
    '<h1>rere</h1>',
    '<script>reer</script>',
    '<p>fdfd</p>',
    '<div>fdff</div>',
    '<section>ffef</section>'
  ];

  const html = "<strong>hello world</strong>";
  console.log(sanitize(html));
  console.log(sanitize("<img src=x onerror=alert('img') />"));
  console.log(sanitize("console.log('hello world')"));
  console.log(sanitize("<script>alert('hello world')</script>"));


  var cleanList = dirtylist.map((ele) => sanitize(ele, { allowedTags: [] }));

  response.status(200).send(cleanList);
});

app.get('/.../:id', async (request: Request, response: Response, next: NextFunction) => {
  console.log(request.params.id, 'params id');
  response.send(`${request.params.id} params`);
});

app.get('/...', async (request: Request, response: Response, next: NextFunction) => {

  const ssss:string = request.query.id as string;
  console.log(request.query.id, 'query string');
  response.send(`${request.query.id} query string`);
});

app.post('/...', async (request: Request, response: Response, next: NextFunction) => {

  console.log(request.body.id);
  response.send('what the....');
});

app.post('/bodytest', async (request: Request, response: Response, next: NextFunction) => {
  try{
  }catch(e){
    response.status(200).send('error...... why??');
  }
});

app.listen(port, () => {
  console.log(`start server port ${port}`);
});
