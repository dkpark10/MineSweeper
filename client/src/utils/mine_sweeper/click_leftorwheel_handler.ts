import {
  Coord,
  ClickRenderStatus,
} from 'mine-sweeper-type';

import ClickHandler from './click_handler';

const directionY: number[] = [0, 0, 1, -1, -1, -1, 1, 1];
const directionX: number[] = [1, -1, 0, 0, -1, 1, -1, 1];

interface IClickLeftOrWheelHandler {
  depthFirstSearch: (coord: Coord) => number;
}

export default abstract class ClickLeftOrWheelHandler
  extends ClickHandler
  implements IClickLeftOrWheelHandler {
  public depthFirstSearch(coord: Coord): number {
    let numofExtraCell = 1;
    const { y, x }: Coord = coord;
    const { cellData } = this;

    cellData[y][x].visited = true;

    numofExtraCell += this.setNeighborCell(coord);

    for (let i = 0; i < 8; i += 1) {
      const nextY = y + directionY[i];
      const nextX = x + directionX[i];

      if (this.checkOutRange(nextY, nextX)) {
        // eslint-disable-next-line
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
}
