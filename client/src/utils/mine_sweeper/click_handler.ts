import { Coord, CellData, BoardSize, ClickRenderStatus } from 'mine-sweeper-type'

const directionY: number[] = [0, 0, 1, -1, -1, -1, 1, 1];
const directionX: number[] = [1, -1, 0, 0, -1, 1, -1, 1];

export abstract class ClickHandler {

  protected readonly cellData: CellData[][];
  protected readonly coord: Coord;
  protected readonly boardSize?: BoardSize;

  constructor(c: CellData[][], coo: Coord, bs?: BoardSize) {
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

  public depthFirstSearch(coord: Coord): number {

    let numofExtraCell: number = 1;
    const { y, x }: Coord = coord;
    const cellData: CellData[][] = this.cellData;
    
    cellData[y][x].visited = true;

    numofExtraCell += this.setNeighborCell(coord);

    for (let i = 0; i < 8; i++) {
      const nextY = y + directionY[i];
      const nextX = x + directionX[i];

      if (this.checkOutRange(nextY, nextX)) {
        continue;
      }

      // 방문한곳이 아니어야하며
      // 주위 지뢰가 없는 순수한칸이며
      // 깃발이 꽂혀있지 않으며
      // 지뢰가 있지 않은곳으로 연쇄충돌
      if (cellData[nextY][nextX].visited === false
        && cellData[nextY][nextX].neighbor <= 0
        && cellData[nextY][nextX].flaged === false
        && cellData[nextY][nextX].mine === false) {
        numofExtraCell += this.depthFirstSearch({ y: nextY, x: nextX });
      }
    }

    return numofExtraCell;
  }

  // 연쇄 충돌을 일으키기전 빈칸주위(근처지뢰가 있는 셀)을 체크하는 함수
  public setNeighborCell(coord: Coord): number {

    let numofExtraCell: number = 0;
    const { y, x }: Coord = coord;
    const cellData: CellData[][] = this.cellData;

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {

        if (this.checkOutRange(i, j)) {
          continue;
        }
        if (i === y && j === x) {
          continue;
        }
        if (cellData[i][j].visited === true) {
          continue;
        }
        if (cellData[i][j].neighbor > 0 && cellData[i][j].flaged === false) {
          cellData[i][j].visible = cellData[i][j].neighbor;
          cellData[i][j].visited = true;
          numofExtraCell++;
        }
      }
    }

    return numofExtraCell;
  }

  public abstract process(): ClickRenderStatus
}