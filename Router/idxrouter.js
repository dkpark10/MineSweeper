const express = require('express');
const router = express.Router();
const minestatus = require('../lib/mineStatus');

router.get('/', (request, response) => {
  minestatus.initializeStatus();
  response.render('index.html');  
  console.log("계속들어가냐???");
})

router.post('/buttonhandleing', (request, response ) => {
  let coord = request.body;
  let returnJson = {};

  response.status(200).json(returnJson);
});

module.exports = router;