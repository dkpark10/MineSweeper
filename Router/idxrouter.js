const express = require('express');
const router = express.Router();
const buttonHandler = require('../lib/buttonHandler');
const initMineData = require('../lib/initMineData');
const mineData = require('../lib/mineData');
const fs = require('fs');
const path = require('path');

router.get('/', (request, response) => {

  if (request.session.mine === undefined) {
    buttonHandler.plantMine(initMineData);
    buttonHandler.setAroundNumberOfCell(initMineData);
    request.session.mine = initMineData;
  }
  response.render("index", {});
});

router.post('/buttonhandleing', (request, response) => {

  let jsonData = {};
  if (request.session.mine === undefined) {
    response.status(200).json(jsonData);
    response.end();
  }
  else{
    const sess = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    buttonHandler.chainCollision(sess,coord);
    response.status(200).json({number: sess.aroundNumberOfBoard[coord.y][coord.x]});
  }
});

router.post('/ranking', (request, response) => {
  response.send("test~~~");
});

module.exports = router;