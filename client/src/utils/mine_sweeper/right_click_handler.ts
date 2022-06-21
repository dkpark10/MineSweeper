import { Coord, ClickRenderStatus } from 'mine-sweeper-type';
import ClickHandler from './click_handler';

export default class RightClickHandler extends ClickHandler {
  public process(): ClickRenderStatus {
    const { cellData } = this;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].visited === true
      && (cellData[y][x].neighbor > 0
        || cellData[y][x].neighbor <= 0)) {
      return {
        render: false,
        clickBomb: false,
        removeCell: 0,
      };
    }

    cellData[y][x].flaged = !cellData[y][x].flaged;
    cellData[y][x].visible = cellData[y][x].flaged === true ? 'flag' : ' ';

    return {
      render: true,
      clickBomb: false,
      removeCell: 0,
    };
  }
}
