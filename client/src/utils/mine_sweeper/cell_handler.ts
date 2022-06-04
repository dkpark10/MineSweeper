import { CellData, BoardSize } from 'mine-sweeper-type'

export default class CellHandler {

  private readonly cellData: CellData[][];
  private readonly boardSize: BoardSize;
  private readonly countOfMine: number;

  constructor(cd: CellData[][] , bs: BoardSize, cntMine: number) {

    this.cellData = cd;
    this.boardSize = bs;
    this.countOfMine = cntMine;

    this.plantMine();
    this.getNeighbor();
    return this;
  }

  public plantMine() {
    let tmp = this.countOfMine;
    const { row, col } = this.boardSize;
    while (tmp) {

      let ranY: number = -1;
      let ranX: number = -1;

      if (process.env.NODE_ENV === 'production') {
        // 보안상 이유로 랜덤함수 교체
        ranY = window.crypto.getRandomValues(new Uint8Array(1))[0] % row;
        ranX = window.crypto.getRandomValues(new Uint8Array(1))[0] % col;
      } else {
        ranY = Math.floor(Math.random() * row);
        ranX = Math.floor(Math.random() * col);
      }

      if (this.cellData[ranY][ranX].mine === false) {
        this.cellData[ranY][ranX].mine = true;
        tmp--;
      }
    }
  }

  public getNeighbor() {
    const { row, col, } = this.boardSize;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        this.cellData[i][j].neighbor = this.calcNeighbor(i, j);
      }
    }
  }

  public calcNeighbor(y: number, x: number) {
    let surroundingMineCount = 0;

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {

        if (this.isOutofRange(i, j))
          continue;

        if (y === i && x === j)
          continue;

        if (this.cellData[i][j].mine === true)
          surroundingMineCount++;
      }
    }
    return surroundingMineCount;
  }

  public isOutofRange(y: number, x: number) {
    return y < 0 || x < 0 || y >= this.boardSize.row || x >= this.boardSize.col;
  }

  public getCellData(): CellData[][] {
    return this.cellData
  }
}