import DistanceCalculator from './distance_calculator';

export interface AnimationTile {
  y: number;
  x: number;
  value: number;
  isDelete: boolean;
  isNew: boolean;
}

interface Params {
  prev: number[][],
  next: number[][]
}

export const calculMoveDistance = ({ prev, next }: Params, dir: string): AnimationTile[][] => {
  // eslint-disable-next-line
  const length = prev.length;
  const result: number[][] = new DistanceCalculator(prev, dir)
    .run()
    .getTileData();

  const moveTile: AnimationTile[][] = Array.from(
    { length },
    (_1, row) => Array.from({ length }, (_2, col) => ({
      y: 0,
      x: 0,
      value: result[row][col] !== 0 ? prev[row][col] : next[row][col],
      isDelete: result[row][col] !== 0,
      isNew: next[row][col] !== 0,
    })),
  );

  switch (dir) {
    case 'ArrowUp':
      for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
          moveTile[i][j].y = -1 * result[i][j];
        }
      }
      break;
    case 'ArrowDown':
      for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
          moveTile[i][j].y = result[i][j];
        }
      }
      break;
    case 'ArrowRight':
      for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
          moveTile[i][j].x = result[i][j];
        }
      }
      break;
    case 'ArrowLeft':
      for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
          moveTile[i][j].x = -1 * result[i][j];
        }
      }
      break;
    default: break;
  }

  return moveTile;
};
