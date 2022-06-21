import {
  Coord,
  GameInfo,
} from 'mine-sweeper-type';
import ClickHandler from './click_handler';

export default class ClickHoverHandler extends ClickHandler {
  public process(gameInfo: GameInfo): GameInfo {
    const { y, x }: Coord = this.coord;

    for (let row = y - 1; row <= y + 1; row += 1) {
      for (let col = x - 1; col <= x + 1; col += 1) {
        if (this.checkOutRange(row, col)
          || this.cellData[row][col].visited === true
          || this.cellData[row][col].flaged === true) {
          // eslint-disable-next-line
          continue;
        }

        this.cellData[row][col].isPointerHover = true;
      }
    }

    return gameInfo;
  }
}
