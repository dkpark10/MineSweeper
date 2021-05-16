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

  const mineData: MineData = (function (arg: difficulty) {
    return {
      row: arg.row,
      col: arg.col,
      numberOfMine: arg.numberOfMine,
      extraCell: (arg.row * arg.col) - arg.numberOfMine,
      board: Array.from({ length: arg.row }, () => { })
        .map(() => Array.from({ length: arg.col }, () => cloneObject(mineBoard)))
    }
  })(easy);

  // 싱글톤 
  buttonHandler = ButtonHandler.getInstance(mineData);

  let responseBoard: number[][];
  buttonHandler.plantMine();
  buttonHandler.setAroundMineNumberOfCell();

  // 지뢰밭 배열 추출
  responseBoard = mineData.board.map((ele1: MineBoard[]) => {
    return ele1.map((ele2: MineBoard) => ele2.mine);
  });

  response.render("index", { row: mineData.row, 
                            col: mineData.col, 
                            mine: responseBoard , 
                            numofMine: mineData.numberOfMine});
});


router.post('/leftclickhandle', (request: Request, response: Response, nextfunction: NextFunction) => {

  const coord: Coord = { y: Number(request.body.y), x: Number(request.body.x) };
  let responseJson: { [key: string]: ResponseJSON[] | undefined } = {};

  if (buttonHandler.isClickFlag(coord.y, coord.x)) {
    responseJson['responsedata'] = [{ y: coord.y, x: coord.x, status: EventStatus.NOTHING, num: -1 }];
    response.status(200).json(responseJson);
  }
  else if (buttonHandler.isClickMine(coord.y, coord.x)) {
    responseJson['responsedata'] = [{ y: coord.y, x: coord.x, status: EventStatus.END, num: -1 }];
    response.status(200).json(responseJson);
  }
  else if (buttonHandler.getBoard()[coord.y][coord.x].aroundNumber > 0) {
    const numOfCell: number = buttonHandler.getBoard()[coord.y][coord.x].aroundNumber;
    buttonHandler.getBoard()[coord.y][coord.x].visited = true;
    buttonHandler.setExtraCell(buttonHandler.getExtraCell() - 1);
    
    const eventStauts: EventStatus = buttonHandler.isGameClear() ? EventStatus.END : EventStatus.NUMBERCELL;
    responseJson['responsedata'] = [{ y: coord.y, x: coord.x, status: eventStauts, num: numOfCell }];
    response.status(200).json(responseJson);
  }
  else {
    responseJson['responsedata'] = buttonHandler.chainConflict(coord.y, coord.x);
    response.status(200).json(responseJson);
  }
});


router.post('/rightclickhandle', (request: Request, response: Response, nextfunction: NextFunction) => {

  const coord: Coord = { y: Number(request.body.y), x: Number(request.body.x) };

  response.status(200).json(buttonHandler.setFlag(coord.y, coord.x));
});


router.post('/wheelclickhandle', (request: Request, response: Response, nextfunction: NextFunction) => {

  const coord: Coord = { y: Number(request.body.y), x: Number(request.body.x) };

  let responseJson: { [key: string]: ResponseJSON[] | undefined } = {};
  responseJson['responsedata'] = buttonHandler.wheelClickHandle(coord.y, coord.x);
  response.status(200).json(responseJson);
});

export = router;