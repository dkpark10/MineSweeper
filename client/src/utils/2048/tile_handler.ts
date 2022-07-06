/*eslint-disable*/
import UpMoveTileHandler from './move_tile_up';
import DownMoveTileHandler from './move_tile_down';
import LeftMoveTileHandler from './move_tile_left';
import RightMoveTileHandler from './move_tile_right';
import { NewTileResult } from './move_tile';

const BOARD_SIZE = 4 as const;

const isFullBoard = (board: number[][]): boolean => {
  const count = board.reduce((rowAcc, row) => {
    return rowAcc += row.reduce((colAcc, col) => {
      return colAcc += col !== 0 ? 1 : 0;
    }, 0);
  }, 0);

  return count === BOARD_SIZE ** 2;
};

const isGameOver = (board: number[][]): boolean => {
  const diry: number[] = [0, 0, 1, -1];
  const dirx: number[] = [1, -1, 0, 0];

  const isOutRange = (y: number, x: number): boolean => (
    y < 0 || x < 0 || y >= BOARD_SIZE || x >= BOARD_SIZE
  );

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (board[row][col] === 0) {
        return false;
      }

      for (let i = 0; i < 4; i += 1) {
        const nextY = diry[i] + row;
        const nextX = dirx[i] + col;

        if (isOutRange(nextY, nextX)) {
          continue;
        }

        if (board[row][col] === board[nextY][nextX]) {
          return false;
        }
      }
    }
  }
  return true;
};

const getInitValue = () => (
  Math.floor(Math.random() * 15) < 14 ? 2 : 4
);

type NewTile = { y: number, x: number, value: number };
const createTile = (board: number[][], cnt: number): NewTile[] => {
  const noTileList: number[] = [];
  const result: NewTile[] = [];

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      if (board[i][j] === 0) {
        noTileList.push(i * BOARD_SIZE + j);
      }
    }
  }

  let prevY, prevX;
  while (cnt) {
    const newTileIndex = Math.floor(Math.random() * noTileList.length);
    const newY = Math.floor(noTileList[newTileIndex] / BOARD_SIZE);
    const newX = noTileList[newTileIndex] % BOARD_SIZE;

    if (board[newY][newX] === 0 && prevY !== newY && prevX !== newX) {
      prevY = newY;
      prevX = newX;
      result.push({
        y: newY,
        x: newX,
        value: getInitValue(),
      });
      cnt -= 1;
    }
  }

  return result;
};

const moveTile = (board: number[][], dir: string): NewTileResult => {
  if (dir === 'ArrowRight') {
    return new RightMoveTileHandler(board)
      .move()
      .getResult();
  }
  if (dir === 'ArrowLeft') {
    return new LeftMoveTileHandler(board)
      .move()
      .getResult();
  }
  if (dir === 'ArrowUp') {
    return new UpMoveTileHandler(board)
      .move()
      .getResult();
  }

  return new DownMoveTileHandler(board)
    .move()
    .getResult();
};

export {
  createTile, moveTile, isGameOver, isFullBoard,
};
