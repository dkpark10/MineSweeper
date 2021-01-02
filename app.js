const express = require('express');
const app = express();
const fs = require('fs');
const helmet = require('helmet');
const compression = require('compression');
const port = 8080;
const bodyparser = require('body-parser');
const path = require('path');

const idxrouter = require('./Router/idxrouter');
// const rankrouter = require('./Router/rankrouter');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname + '/public')));

app.use('/', idxrouter);

app.use((request,response,next) => {
  response.status(404).send('Not Found');
})

app.use((error,request,response, next) =>{
  console.error(error.stack);
  console.log(path.join(__dirname + 'public'));
  response.status(500).send('Something broke');
})

app.listen(port, () =>{
  console.log(`Waiting... ${port}`);
})