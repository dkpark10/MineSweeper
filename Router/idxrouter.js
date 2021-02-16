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
  response.render("index", {mine:request.session.mine.mineBoard});
});

router.post('/leftClickHandle', (request, response) => {

  if (request.session.mine === undefined) {
    response.status(200).json({});
  }
  else{
    const sess = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    let minedata = buttonHandler.mineData(sess);
    
    if(buttonHandler.isClickedMine(minedata, coord)){
      response.status(200).json({ coord: coord, status: 'clickMine', number: 0, board: minedata.getMineBoard() });
    }
    else if(buttonHandler.isClickedFlag(minedata, coord)){
      response.status(200).json({ coord: coord, status: 'clickFlag', number: 0 });
    }
    else{
      response.status(200).json(buttonHandler.breadthFirstSearch(minedata, coord));
    }
    request.session.mine = minedata;
    minedata = null;                    // 클로저 사용 후 메모리 해제
  }
});

router.post('/middleClickHandle', (request,response) =>{
  
  if(request.session.mine === undefined){
    response.status(200).json({});
  }
  else{
    const sess = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    let minedata = buttonHandler.mineData(sess);

    if(buttonHandler.isRightStickFlag(minedata, coord) === false){
      response.status(200).json({ coord: coord, status: 'clickMine', number:false, board:minedata.getMineBoard()});
    }
    else {

    }

    request.session.mine = minedata;
    minedata = null;                    // 클로저 사용 후 메모리 해제
  }
});

router.post('/rightClickHandle', (request,response) =>{
  
  if(request.session.mine === undefined){
    response.status(200).json({});
  }
  else{
    const sess = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    let minedata = buttonHandler.mineData(sess);

    response.status(200).json(buttonHandler.setFlagMark(minedata, coord));

    request.session.mine = minedata;
    minedata = null;                    // 클로저 사용 후 메모리 해제
  }
});

router.post('/ranking', (request, response) => {
  response.send("test~~~");
});

module.exports = router;