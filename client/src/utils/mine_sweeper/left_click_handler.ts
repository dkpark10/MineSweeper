import {
  Coord,
  GameInfo,
} from 'mine-sweeper-type';
import ClickLeftOrWheelHandler from './click_leftorwheel_handler';

export default class LeftClickHandler extends ClickLeftOrWheelHandler {
  public process(gameInfo: GameInfo): GameInfo {
    const { y, x }: Coord = this.coord;
    const { cellData } = this;

    // 방문한 곳 or 깃발
    if (cellData[y][x].visited === true
      || cellData[y][x].flaged === true) {
      return gameInfo;
    }

    // 지뢰면 게임오버다.
    if (cellData[y][x].mine === true) {
      cellData[y][x].visible = '💣';
      return {
        ...gameInfo,
        extraCell: 0,
        gameClearSuccess: false,
        isGameOver: true,
      };
    }

    if (cellData[y][x].neighbor > 0) {
      cellData[y][x].visible = cellData[y][x].neighbor;
      cellData[y][x].visited = true;

      return {
        ...gameInfo,
        firstClick: false,
        extraCell: gameInfo.extraCell - 1,
        gameClearSuccess: gameInfo.extraCell - 1 <= 0,
      };
    }

    const numofRemoveCell: number = this.depthFirstSearch({ y, x });

    return {
      ...gameInfo,
      firstClick: false,
      extraCell: gameInfo.extraCell - numofRemoveCell,
      gameClearSuccess: gameInfo.extraCell - numofRemoveCell <= 0,
    };
  }
}
