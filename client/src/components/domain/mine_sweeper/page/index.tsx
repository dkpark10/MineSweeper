import React from 'react';
import { LevelType } from 'mine-sweeper-type';
import Game from '../organisms/game';
import Header from '../../../common/organisms/header';

import { getLocalStorageItem } from '../../../../utils/common';
import levelList from '../../../../utils/mine_sweeper/level';
import CellHandler from '../../../../utils/mine_sweeper/cell_handler';

export default function MineSweeper() {
  const level = getLocalStorageItem({
    key: 'difficulty',
    defaultValue: 'easy',
    validator: (val: string) => ['easy', 'normal', 'hard'].filter((ele) => ele === val).length > 0,
  });

  const { row, col, countOfMine } = levelList[level as LevelType];
  const initCells = new CellHandler({ row, col }, countOfMine).getCellData();

  return (
    <>
      <Header />
      <Game
        level={level as LevelType}
        initCells={initCells}
      />
    </>
  );
}
