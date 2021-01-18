const express = require('express');
const router = express.Router();
const minestatus = require('../lib/mineStatus');
const buttonHandler = require('../lib/buttonHandler');
const template = require('../lib/template');
const fs = require('fs');
const path = require('path');

router.get('/', (request, response) => {
  if(request.session.mine === undefined){
    console.log('/에 들어왔어용 ~~');
    let row = minestatus.row;
    let col = minestatus.col;
    let value = {ismine : 0, status : minestatus.status.init}; 
    minestatus.map = Array.from(Array(row), () => new Array(col).fill(value));
    console.log(`sibal check ${minestatus.map}`);
    minestatus.visited = Array.from(Array(row), () => new Array(col).fill(false));
    request.session.mine = minestatus;
  }
  response.render("index", {});
});

router.post('/buttonhandleing', (request, response ) => {
  console.log('/버튼핸들링에 들어옴 ~~');
  const body = request.body;
  let mine = request.session.mine;
  let coord = {y:Number(body.y), x:Number(body.x)};
  console.log(mine.map);
  response.send('test');
});

router.post('/ranking', (request, response ) => {
  response.send("test~~~");
});

module.exports = router;