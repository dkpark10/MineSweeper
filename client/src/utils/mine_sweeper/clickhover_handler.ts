import { Coord, ClickRenderStatus } from 'mine-sweeper-type';
import ClickHandler from './click_handler';

export default class ClickHoverHandler extends ClickHandler {
  public process(): ClickRenderStatus {
    const { y, x }: Coord = this.coord;

    for (let i = y - 1; i <= y + 1; i += 1) {
      for (let j = x - 1; j <= x + 1; j += 1) {
        if (this.checkOutRange(i, j)
          || this.cellData[i][j].visited === true
          || this.cellData[i][j].flaged === true) {
          // eslint-disable-next-line
          continue;
        }

        this.cellData[i][j].isPointerHover = true;
      }
    }

    return {
      render: true,
      clickBomb: false,
      removeCell: 0,
    };
  }
}
