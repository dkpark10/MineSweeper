const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const bodyparser = require('body-parser');
const session = require('express-session');
const fileStore = require('session-file-store')(session)
const secret = require('./secret/session')
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const port = 8080;
const idxrouter = require('./Router/idxrouter');
// const rankrouter = require('./Router/rankrouter');

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

app.use((request,response,next) => {
  response.status(404).send('Not Found');
})

app.use((error,request,response, next) =>{
  console.error(error.stack);
  response.status(500).send('Something broke');
})

app.listen(port, () =>{
  console.log(`Waiting... ${port}`);
})