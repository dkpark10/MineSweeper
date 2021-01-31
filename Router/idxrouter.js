const express = require('express');
const router = express.Router();
const buttonHandler = require('../lib/buttonHandler');
const difficulty = require('../lib/difficulty');
const mineData = require('../lib/mineData');
const fs = require('fs');
const path = require('path');

router.get('/', (request, response) => {

  if (request.session.mine === undefined) {
    buttonHandler.setMineData(difficulty);
    buttonHandler.plantMine(difficulty);
    buttonHandler.setAroundNumberOfCell(difficulty);
    request.session.mine = difficulty;
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
    const sessionMineData = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    const minedata = mineData(sessionMineData);
    buttonHandler.chainCollision(minedata, coord);
    response.status(200).json(jsonData);
  }
});

router.post('/ranking', (request, response) => {
  response.send("test~~~");
});

module.exports = router;