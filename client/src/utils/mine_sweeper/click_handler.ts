import {
  Coord,
  CellData,
  BoardSize,
  ClickRenderStatus,
} from 'mine-sweeper-type';

export default abstract class ClickHandler {
  protected readonly cellData: CellData[][];

  protected readonly coord: Coord;

  protected readonly boardSize: BoardSize;

  constructor(c: CellData[][], coo: Coord, bs = { row: 9, col: 9 }) {
    this.cellData = c;
    this.coord = coo;
    this.boardSize = bs;
  }

  public getCellData(): CellData[][] {
    return this.cellData;
  }

  public checkOutRange(y: number, x: number): boolean {
    return y < 0 || x < 0 || y >= this.boardSize.row || x >= this.boardSize.col;
  }

  // 연쇄 충돌을 일으키기전 빈칸주위(근처지뢰가 있는 셀)을 체크하는 함수
  public setNeighborCell(coord: Coord): number {
    let numofExtraCell = 0;
    const { y, x }: Coord = coord;
    const { cellData } = this;

    for (let i = y - 1; i <= y + 1; i += 1) {
      for (let j = x - 1; j <= x + 1; j += 1) {
        if (this.checkOutRange(i, j)) {
          // eslint-disable-next-line
          continue;
        }
        if (i === y && j === x) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[i][j].visited === true) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[i][j].neighbor > 0 && cellData[i][j].flaged === false) {
          cellData[i][j].visible = cellData[i][j].neighbor;
          cellData[i][j].visited = true;
          numofExtraCell += 1;
        }
      }
    }

    return numofExtraCell;
  }

  public abstract process(): ClickRenderStatus;
}
