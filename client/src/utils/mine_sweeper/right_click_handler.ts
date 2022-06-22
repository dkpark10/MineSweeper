import {
  Coord,
  GameInfo,
} from 'mine-sweeper-type';
import ClickHandler from './click_handler';

export default class RightClickHandler extends ClickHandler {
  public process(gameInfo: GameInfo): GameInfo {
    const { cellData } = this;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].visited === true
      && (cellData[y][x].neighbor > 0
        || cellData[y][x].neighbor <= 0)) {
      return gameInfo;
    }

    cellData[y][x].flaged = !cellData[y][x].flaged;
    cellData[y][x].visible = cellData[y][x].flaged === true ? 'flag' : ' ';

    return {
      ...gameInfo,
      countOfFlag: cellData[y][x].flaged
        ? gameInfo.countOfFlag - 1
        : gameInfo.countOfFlag + 1,
    };
  }
}
