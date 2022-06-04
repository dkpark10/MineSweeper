import { ClickHandler } from './click_handler';
import { Coord, CellData, ClickRenderStatus } from 'mine-sweeper-type'

const noRender: ClickRenderStatus = {
  render: false,
  clickBomb: false,
  removeCell: 0
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
      return {
        render: true,
        clickBomb: true,
        removeCell: 987654321
      };
    }

    // 주위 연쇄충돌
    if (cellData[y][x].neighbor > 0) {

      cellData[y][x].visible = cellData[y][x].neighbor;
      cellData[y][x].visited = true;
      return {
        render: true,
        clickBomb: false,
        removeCell: 1
      };
    }

    const numofRemoveCell: number = this.depthFirstSearch({ y, x });

    return {
      render: true,
      clickBomb: false,
      removeCell: numofRemoveCell
    };
  }
}

export default LeftClickHandler;