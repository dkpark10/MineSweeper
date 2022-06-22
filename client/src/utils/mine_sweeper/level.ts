import {
  Level,
  LevelType,
} from 'mine-sweeper-type';

const levelList: { [key in LevelType]: Level } = {
  easy: { row: 9, col: 9, countOfMine: 10 },
  normal: { row: 16, col: 16, countOfMine: 40 },
  hard: { row: 16, col: 30, countOfMine: 99 },
};

export default levelList;
