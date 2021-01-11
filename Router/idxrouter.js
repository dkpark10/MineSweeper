const express = require('express');
const router = express.Router();
const minestatus = require('../lib/mineStatus');
const template = require('../lib/template');
const fs = require('fs');
const path = require('path');

router.get('/', (request, response) => {
  minestatus.initializeStatus();
  console.log(minestatus.map[0]);
  response.render("index", {});
});

router.post('/buttonhandleing', (request, response ) => {
  const coord = request.body;
  let y = Number(coord.y);
  let x = Number(coord.x);
  // response.status(200).json(returnJson);
});

module.exports = router;