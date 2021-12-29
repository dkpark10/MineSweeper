import { ClickHandler } from './ClickHandler';
import { CellData, Coord, ClickRenderStatus } from './Common';

const noRender: ClickRenderStatus = {
  render: false,
  flag: false,
  removeCell: -1
}

class RightClickHandler extends ClickHandler {

  public process(): ClickRenderStatus {

    const cellData: CellData[][] = this.cellData;
    const { y, x }: Coord = this.coord;

    if (cellData[y][x].visited === true
      && (cellData[y][x].neighbor > 0
        || cellData[y][x].neighbor <= 0)) {

      return noRender;
    }

    let value: boolean = cellData[y][x].flaged;
    value = !value;
    cellData[y][x].flaged = value;
    cellData[y][x].visible = value === true ? '🚩' : ' ';

    return {
      render: true,
      flag: true,
      removeCell: 0
    } as ClickRenderStatus
  }
}

export default RightClickHandler;