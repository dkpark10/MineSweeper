const express = require('express');
const router = express.Router();
const buttonHandler = require('../lib/buttonHandler');
// const template = require('../lib/template');
const fs = require('fs');
const path = require('path');
const mineData = require('../lib/mineData');

const directionY = [0,0,1,-1];
const directionX = [1,-1,0,0];

router.get('/', (request, response) => {
  if(request.session.mine === undefined){
    mineData.setInitVisited();
    mineData.setInitMap();
    buttonHandler.plantMine(mineData);

    request.session.mine = mineData;
  }
  response.render("index", {});
});

router.post('/buttonhandleing', (request, response ) => {
  console.log('/버튼핸들링에 들어옴 ~~');
  const body = request.body;
  let sessMine = request.session.mine;
  let coord = {y:Number(body.y), x:Number(body.x)};
});

router.post('/ranking', (request, response ) => {
  response.send("test~~~");
});

module.exports = router;