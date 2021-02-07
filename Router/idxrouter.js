const express = require('express');
const router = express.Router();
const buttonHandler = require('../lib/buttonHandler');
const initMineData = require('../lib/initMineData');

router.get('/', (request, response) => {

  if (request.session.mine === undefined) {
    buttonHandler.plantMine(initMineData);
    buttonHandler.setAroundNumberOfCell(initMineData);
    request.session.mine = initMineData;
  }
  response.render("index", {});
});

router.post('/leftClickHandle', (request, response) => {

  let jsonData = {};
  if (request.session.mine === undefined) {
    response.status(200).json(jsonData);
  }
  else{
    const sess = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    let minedata = buttonHandler.mineData(sess);
    
    if(buttonHandler.isClickedMine(minedata, coord)){
      response.status(200).json({ coord: coord, status: 'clickMine' });
    }
    else if(buttonHandler.isClickedFlag(minedata,coord)){
      response.status(200).json({ coord: coord, status: 'clickFlag' });
    }
    else if(buttonHandler.isAroundMineMoreThanOne(minedata.coord)){
      response.status(200).json({ coord: coord, status: 'disabled ',number: minedata.getNumberOfMine[coord.y][coord.x] });
    }
    else{
       response.status(200).json(buttonHandler.breadthFirstSearch(minedata, coord));
    }
    minedata = null;
  }
});

router.post('/rightClickHandle', (request,response) =>{

});

router.post('/ranking', (request, response) => {
  response.send("test~~~");
});

module.exports = router;