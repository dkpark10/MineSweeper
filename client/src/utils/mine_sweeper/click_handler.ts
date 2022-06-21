import {
  Coord,
  CellData,
  BoardSize,
  GameInfo,
  WheelClickDown,
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

  public removePrevHoverCoord({ prevHoverY, prevHoverX }: WheelClickDown) {
    for (let row = prevHoverY - 1; row <= prevHoverY + 1; row += 1) {
      for (let col = prevHoverX - 1; col <= prevHoverX + 1; col += 1) {
        if (this.checkOutRange(row, col)) {
          // eslint-disable-next-line
          continue;
        }

        if (this.cellData[row][col].isPointerHover === true) {
          this.cellData[row][col].isPointerHover = false;
        }
      }
    }
    return this;
  }

  // 연쇄 충돌을 일으키기전 빈칸주위(근처지뢰가 있는 셀)을 체크하는 함수
  public setNeighborCell(coord: Coord): number {
    let numofExtraCell = 0;
    const { y, x }: Coord = coord;
    const { cellData } = this;

    for (let row = y - 1; row <= y + 1; row += 1) {
      for (let col = x - 1; col <= x + 1; col += 1) {
        if (this.checkOutRange(row, col)) {
          // eslint-disable-next-line
          continue;
        }
        if (row === y && col === x) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[row][col].visited === true) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[row][col].neighbor > 0 && cellData[row][col].flaged === false) {
          cellData[row][col].visible = cellData[row][col].neighbor;
          cellData[row][col].visited = true;
          numofExtraCell += 1;
        }
      }
    }

    return numofExtraCell;
  }

  public abstract process(gameInfo: GameInfo): GameInfo;
}
