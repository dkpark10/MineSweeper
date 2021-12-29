import { ClickHandler } from './ClickHandler';
import { CellData, Coord, ClickRenderStatus } from './Common';

interface WheelClickInterFace {
  isFlagonMine(y: number, x: number): boolean;
}

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

class WheelClickHandler extends ClickHandler implements WheelClickInterFace {

  public process(): ClickRenderStatus {

    let numofExtraCell: number = 0;
    const cellData: CellData[][] = this.cellData;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].neighbor < 0
      || cellData[y][x].flaged === true
      || cellData[y][x].visited === false) {

      console.log('norender');
      return noRender;
    }

    let numofHit: number = 0;
    let numofAroundFlag: number = 0;

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.checkOutRange(i, j)) {
          continue;
        }
        if (cellData[i][j].flaged === true) {
          numofAroundFlag++;
        }
        if (this.isFlagonMine(i, j)) {
          numofHit++;
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

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.checkOutRange(i, j)) {
          continue;
        }
        if (cellData[i][j].flaged === true || cellData[i][j].visited === true) {
          continue;
        }
        if (cellData[i][j].neighbor > 0) {
          cellData[i][j].visible = cellData[i][j].neighbor;
          cellData[i][j].visited = true;
          numofExtraCell++;
          continue;
        }
        numofExtraCell += this.depthFirstSearch({ y: i, x: j });
      }
    }

    return {
      render: true,
      flag: false,
      removeCell: numofExtraCell
    } as ClickRenderStatus;
  }


  public isFlagonMine(y: number, x: number): boolean {
    return this.cellData[y][x].flaged === true && this.cellData[y][x].mine === true;
  }
}

export default WheelClickHandler;