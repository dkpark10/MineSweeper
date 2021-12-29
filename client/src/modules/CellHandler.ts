import { Level, CellData } from './Common';

export const initializeCell = (row: number, col: number): CellData[][] => {
  
  const ret: CellData[][] = Array.from({ length: row }, () => Array)
    .map(() => Array.from({ length: col }, () => {
      return {
        mine: false,
        neighbor: 0,
        visited: false,
        flaged: false,
        visible: ' '
      };
    }))

  return ret;
}

export const plantMine = (cellData: CellData[][], numberOfMine: number) => {

  const row = cellData.length;
  const col = cellData[0].length;
  let tmp = numberOfMine;

  while (tmp) {
    
    // 보안상 이유로 랜덤함수 교체
    // const ranY = Math.floor(Math.random() * row);
    // const ranX = Math.floor(Math.random() * col);

    const ranY = window.crypto.getRandomValues(new Uint8Array(1))[0] % row;
    const ranX = window.crypto.getRandomValues(new Uint8Array(1))[0] % col;

    if (cellData[ranY][ranX].mine === false) {
      cellData[ranY][ranX].mine = true;
      tmp--;
    }
  }
}

export const getNeighbor = (cellData: CellData[][], level: Level) => {

  const { row, col, }: Level = level;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      cellData[i][j].neighbor = calcNeighbor(i, j, cellData, level);
    }
  }
}

const calcNeighbor = (y: number, x: number, board: CellData[][], { row, col }): number => {

  let ret = 0;

  for (let i = y - 1; i <= y + 1; i++) {
    for (let j = x - 1; j <= x + 1; j++) {

      if (checkOutRange(i, j, row, col))
        continue;

      if (y === i && x === j)
        continue;

      if (board[i][j].mine === true)
        ret++;
    }
  }
  return ret;
}

export const checkOutRange = (y: number, x: number, borderY: number, borderX: number): boolean => {
  return y < 0 || x < 0 || y >= borderY || x >= borderX;
}