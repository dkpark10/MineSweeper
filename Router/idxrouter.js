'use strict';

const express = require('express');
const router = express.Router();
const buttonHandler = require('../lib/buttonHandler');
const difficulty = require('../lib/difficulty');
const requestIP = require('request-ip');


function deleteSession(request) {
  request.session.destroy(function () {
    request.session;
  });
}


// 새로 고침시 전역에 선언하면 이전의 값을 그대로 저장하고 있다.
// 반드시 콜백 안에서 데이터를 초기화하고 작성 !!!!!!!!!!!!!!
// 새로 고침시 http 프로토콜 특성인 휘발성에 따라 데이터가 소실될것이로 생각 
// 하지만 아님 나의 착각...


router.get('/', (request, response) => {

  const initMineData = (function(init){
    let instance;
    const row = init.row;
    const col = init.col;
    const numberofMine = init.numberOfMine;
    const mineBoard = Array.from(Array(init.row), () => Array(init.col).fill(0));
    const visited =  Array.from(Array(init.row), () => Array(init.col).fill(false));
    const flagBoard = Array.from(Array(init.row), () => Array(init.col).fill(0));
    const aroundNumberOfBoard = Array.from(Array(init.row), () => Array(init.col).fill(0));
    let extraCell = (init.row * init.col) - init.numberOfMine;
  
    function initiate() {
      return {
        row:                  row,
        col:                  col,
        numberOfMine:         numberofMine,
        mineBoard:            mineBoard,
        visited:              visited,
        flagBoard:            flagBoard,
        aroundNumberOfBoard:  aroundNumberOfBoard,
        extraCell:            extraCell
      };
    }
  
    return {
      getInstance: function() {
        if(!instance)
          instance = initiate();
        
        return instance;
      }
    }
  })(difficulty);

  
  const initializer = initMineData.getInstance();

  buttonHandler.plantMine(initializer);
  buttonHandler.setAroundNumberOfCell(initializer);
  request.session.mine = initializer;

  response.render("index", { mine: request.session.mine.mineBoard });
});


router.post('/leftClickHandle', (request, response) => {

  if (request.session.mine === undefined) {
    response.status(200).json({});
  }
  else {
    const sess = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    let minedata = buttonHandler.mineData(sess);

    // 왼클릭에 대한 이벤트 
    // 깃발여부를 확인한다. 지뢰더라도 깃발이면 그냥 리턴
    // 깃발이 아닌데 지뢰를 클릭했다면 게임오버
    // 깃발도 지뢰도 아니라면 연쇄충돌 BFS 로 탐색

    if (buttonHandler.isClickedFlag(minedata, coord) === true) {
      response.status(200).json({ coord: coord, status: 'NOTHING', number: 0 , board : undefined});
    }
    else if (buttonHandler.isClickedMine(minedata, coord) === true) {
      response.status(200).json({ coord: coord, status: 'END', number: 0, board: minedata.getMineBoard() });
    }
    else {
      response.status(200).json(buttonHandler.breadthFirstSearch(minedata, coord));
    }
    request.session.mine = minedata;
    minedata = null;                    // 클로저 사용 후 메모리 해제
  }
});


router.post('/middleClickHandle', (request, response) => {

  if (request.session.mine === undefined) {
    response.status(200).json({});
  }
  else {
    const sess = request.session.mine;
    const coord = { y: Number(request.body.y), x: Number(request.body.x) };
    let minedata = buttonHandler.mineData(sess);

    const responseJson = buttonHandler.isRightStickFlag(minedata, coord);
    if (responseJson.status === 'END' || responseJson.status === 'NOTHING') {
      response.status(200).json(responseJson);
    }
    else {
      const temp = responseJson.responsedata.slice();
      temp.forEach(element => {
        responseJson.responsedata.concat(buttonHandler.breadthFirstSearch(minedata, { y: element.coord[0], x: element.coord[1] }));
      });
      response.status(200).json(responseJson);
    }

    request.session.mine = minedata;
    minedata = null;                    // 클로저 사용 후 메모리 해제
  }
});

router.post('/rightClickHandle', (request, response) => {

  if (request.session.mine === undefined) {
    response.status(200).json({});
  }
  else {
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