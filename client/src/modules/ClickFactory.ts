import { ClickHandler } from './ClickHandler';
import LeftClickHandler from './LeftClickHandler';
import RightClickHandler from './RightClickHandler';
import WheelClickHandler from './WheelClickHandler';
import { CellData, Coord, BoardSize } from './Common';

enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLCK };

const createClickFactory = (buttonType: number, cd: CellData[][], coo: Coord, bs: BoardSize): ClickHandler => {
  switch (buttonType) {
    case CLICKTYPE.LEFTCLICK:
      return new LeftClickHandler(cd, coo, bs);
    case CLICKTYPE.RIGHTCLCK:
      return new RightClickHandler(cd, coo);
    case CLICKTYPE.WHEELCLICK:
      return new WheelClickHandler(cd, coo, bs);
  }
}

export default createClickFactory;