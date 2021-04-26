'use strict';

declare function require(param: any): any;
import {Request, Response, NextFunction} from 'express';

const express: any = require('express');
const router:any = express.router();
const app: any = express();

import { test } from '../lib/ptdifficulty';
import { ButtonHandler } from '../lib/pbuttonHandler';
import { MineData, difficulty } from '../lib/ptinterface';

router.get('/', function (request: Request, response: Response, nextfunction: NextFunction) {

  const initMineData = (function (init: difficulty) {
    
    let instance: object = new Object();
    const row: number = init.row;
    const col: number = init.col;
    const numberofMine: number = init.numberOfMine;
    const mineBoard: boolean[][] = Array.from(Array(init.row), () => Array(init.col).fill(0));
    const visited: number[] =  Array.from(Array(init.row), () => Array(init.col).fill(false));
    const flagBoard: number[] = Array.from(Array(init.row), () => Array(init.col).fill(0));
    const aroundNumberOfBoard: number[] = Array.from(Array(init.row), () => Array(init.col).fill(0));
    let extraCell: number = (init.row * init.col) - init.numberOfMine;
  
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
  })(test);
});