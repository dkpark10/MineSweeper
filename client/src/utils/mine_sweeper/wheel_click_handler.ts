import { Coord, ClickRenderStatus } from 'mine-sweeper-type';
import ClickHandler from './click_handler';

interface WheelClickInterFace {
  isFlagonMine(y: number, x: number): boolean;
}

class WheelClickHandler extends ClickHandler implements WheelClickInterFace {
  public process(): ClickRenderStatus {
    let numofExtraCell = 0;
    const { cellData } = this;
    const { y, x }: Coord = this.coord;

    const noRender: ClickRenderStatus = {
      render: false,
      clickBomb: false,
      removeCell: 0,
    };

    const gameOver: ClickRenderStatus = {
      render: true,
      clickBomb: true,
      removeCell: 987654321,
    };

    if (cellData[y][x].neighbor < 0
      || cellData[y][x].flaged === true
      || cellData[y][x].visited === false) {
      return noRender;
    }

    let numofHit = 0;
    let numofAroundFlag = 0;

    for (let i = y - 1; i <= y + 1; i += 1) {
      for (let j = x - 1; j <= x + 1; j += 1) {
        if (this.checkOutRange(i, j)) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[i][j].flaged === true) {
          numofAroundFlag += 1;
        }
        if (this.isFlagonMine(i, j)) {
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
      return noRender;
    }

    for (let i = y - 1; i <= y + 1; i += 1) {
      for (let j = x - 1; j <= x + 1; j += 1) {
        if (this.checkOutRange(i, j)) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[i][j].flaged === true || cellData[i][j].visited === true) {
          // eslint-disable-next-line
          continue;
        }
        if (cellData[i][j].neighbor > 0) {
          cellData[i][j].visible = cellData[i][j].neighbor;
          cellData[i][j].visited = true;
          numofExtraCell += 1;
          // eslint-disable-next-line
          continue;
        }
        numofExtraCell += this.depthFirstSearch({ y: i, x: j });
      }
    }

    return {
      render: true,
      clickBomb: false,
      removeCell: numofExtraCell,
    };
  }

  public isFlagonMine(y: number, x: number): boolean {
    return this.cellData[y][x].flaged === true && this.cellData[y][x].mine === true;
  }
}

export default WheelClickHandler;
