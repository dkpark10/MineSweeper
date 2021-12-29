import { ClickHandler } from './ClickHandler';
import { CellData, Coord, ClickRenderStatus } from './Common';

const noRender: ClickRenderStatus = {
  render: false,
  flag: false,
  removeCell: -1
}

const gameOver: ClickRenderStatus = {
  render: true,
  flag: false,
  removeCell: 987654321
}

class LeftClickHandler extends ClickHandler {

  public process(): ClickRenderStatus {

    const { y, x }: Coord = this.coord;
    const cellData: CellData[][] = this.cellData;

    // 방문한 곳은 클릭할 수 없다.
    if (cellData[y][x].visited === true) {
      return noRender;
    }

    // 깃발은 클릭할 수 없다.
    if (cellData[y][x].flaged === true) {
      return noRender;
    }

    // 지뢰면 게임오버다.
    if (cellData[y][x].mine === true) {
      cellData[y][x].visible = '💣';
      return gameOver;
    }

    // 주위 
    if (cellData[y][x].neighbor > 0) {
      cellData[y][x].visible = cellData[y][x].neighbor;
      cellData[y][x].visited = true;
      return {
        render: true,
        flag: false,
        removeCell: 1
      } as ClickRenderStatus;
    }

    const numofRemoveCell: number = this.depthFirstSearch({ y, x });
    return {
      render: true,
      flag: false,
      removeCell: numofRemoveCell
    } as ClickRenderStatus;
  }
}

export default LeftClickHandler;