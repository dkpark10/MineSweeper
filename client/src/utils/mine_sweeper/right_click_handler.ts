import { ClickHandler } from './click_handler';
import { Coord, CellData, ClickRenderStatus } from 'mine-sweeper-type'

class RightClickHandler extends ClickHandler {

  public process(): ClickRenderStatus {

    const cellData: CellData[][] = this.cellData;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].visited === true
      && (cellData[y][x].neighbor > 0
        || cellData[y][x].neighbor <= 0)) {

      return {
        render: false,
        clickBomb:false,
        removeCell: 0
      };
    }

    cellData[y][x].flaged = !cellData[y][x].flaged;
    cellData[y][x].visible = cellData[y][x].flaged === true ? '🚩' : ' ';

    return {
      render: true,
      clickBomb:false,
      removeCell: 0
    }
  }
}

export default RightClickHandler;