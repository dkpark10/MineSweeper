import {
  Coord,
  GameInfo,
} from 'mine-sweeper-type';
import ClickLeftOrWheelHandler from './click_leftorwheel_handler';

interface WheelClickInterFace {
  isFlagonMine(y: number, x: number): boolean;
}

export default class WheelClickHandler
  extends ClickLeftOrWheelHandler
  implements WheelClickInterFace {
  public process(gameInfo: GameInfo): GameInfo {
    let countOfExtraCell = 0;
    const { cellData } = this;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].neighbor < 0
      || cellData[y][x].flaged === true
      || cellData[y][x].visited === false) {
      return gameInfo;
    }

    let numofHit = 0;
    let numofAroundFlag = 0;

    const gameOver = {
      ...gameInfo,
      extraCell: 0,
      gameClearSuccess: false,
      isGameOver: true,
    };

    for (let row = y - 1; row <= y + 1; row += 1) {
      for (let col = x - 1; col <= x + 1; col += 1) {
        if (this.checkOutRange(row, col)) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[row][col].flaged === true) {
          numofAroundFlag += 1;
        }
        if (this.isFlagonMine(row, col)) {
          numofHit += 1;
        }
      }
    }

    // 주위 깃발을 무지성으로 많이 꼽으면 게임오버
    if (numofAroundFlag > cellData[y][x].neighbor) {
      return gameOver;
    }

    // 깃발개수는 같아도 정확히 지뢰위 깃발을 꼽지 않았다면 게임오버
    if (numofAroundFlag === cellData[y][x].neighbor && numofHit !== cellData[y][x].neighbor) {
      return gameOver;
    }

    if (numofHit !== cellData[y][x].neighbor) {
      return gameInfo;
    }

    for (let row = y - 1; row <= y + 1; row += 1) {
      for (let col = x - 1; col <= x + 1; col += 1) {
        if (this.checkOutRange(row, col)) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[row][col].flaged === true || cellData[row][col].visited === true) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[row][col].neighbor > 0) {
          cellData[row][col].visible = cellData[row][col].neighbor;
          cellData[row][col].visited = true;
          countOfExtraCell += 1;
          // eslint-disable-next-line
          continue;
        }
        countOfExtraCell += this.depthFirstSearch({ y: row, x: col });
      }
    }

    return {
      ...gameInfo,
      extraCell: gameInfo.extraCell - countOfExtraCell,
      gameClearSuccess: gameInfo.extraCell - countOfExtraCell <= 0,
    };
  }

  public isFlagonMine(y: number, x: number): boolean {
    return this.cellData[y][x].flaged === true && this.cellData[y][x].mine === true;
  }
}
