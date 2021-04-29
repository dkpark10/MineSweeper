'use strict';

import { Request, Response, NextFunction } from 'express';

const express: any = require('express');
const router: any = express.Router();
const app: any = express();

import { MineData, difficulty, MineBoard, cloneObject, Coord, ResponseJSON, EventStatus } from '../lib/commonutility';
import { easy, normal, hard, test } from '../lib/ptdifficulty';
import { ButtonHandler } from '../lib/pbuttonHandler';
let buttonHandler: ButtonHandler;

router.get('/', function (request: Request, response: Response, nextfunction: NextFunction) {

  const mineBoard: MineBoard = {
    mine: 0,
    flag: false,
    visited: false,
    aroundNumber: 0
  };

  const tempBoard: MineBoard[][] = Array.from({ length: test.row }, () => {})
    .map(() => Array.from({ length: test.col }, () => cloneObject(mineBoard))); 

  const mineData: MineData = {
    row: test.row,
    col: test.col,
    numberOfMine: test.numberOfMine,
    extraCell: (test.row * test.col) - test.numberOfMine,
    board: tempBoard
  };

  buttonHandler = ButtonHandler.getInstance(mineData);
  let responseBoard: number[][];
  if (request.session.mine === undefined) {
    buttonHandler.plantMine();

    // 지뢰밭 배열 추출
    responseBoard = mineData.board.map((ele1: MineBoard[]) => {
      return ele1.map((ele2: MineBoard) => ele2.mine);
    });

    request.session.mine = mineData;
    response.render("index", { mine: responseBoard });
  }
});


router.post('/leftClickHandle', (request: Request, response: Response, nextfunction: NextFunction) => {

  const sess: MineData = request.session.mine;
  const coord: Coord = { y: Number(request.body.y), x: Number(request.body.x) };

  let responseJson: ResponseJSON | ResponseJSON[];
  if (buttonHandler.isClickFlag(coord.y, coord.x)) {
    responseJson = { y: coord.y, x: coord.x, status: EventStatus.NOTHING, num: -1 } as ResponseJSON;
    response.status(200).json(responseJson);
  }
  else if (buttonHandler.isClickMine(coord.y, coord.x)) {
    responseJson = { y: coord.y, x: coord.x, status: EventStatus.END, num: -1 } as ResponseJSON;
    response.status(200).json(responseJson);
  }
  else if(buttonHandler.getBoard()[coord.y][coord.x].aroundNumber > 0 ){
    const numOfCell: number = buttonHandler.getBoard()[coord.y][coord.x].aroundNumber;
    responseJson = { y: coord.y, x: coord.x, status: EventStatus.NUMBERCELL, num: numOfCell } as ResponseJSON;
    response.status(200).json(responseJson);
  }
  else{
    
  }
  
});
export = router;