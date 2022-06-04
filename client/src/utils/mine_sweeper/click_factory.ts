import { ClickHandler } from './click_handler';
import LeftClickHandler from './left_click_handler';
import RightClickHandler from './right_click_handler';
import WheelClickHandler from './wheel_click_handler';
import { Coord, CellData, BoardSize } from 'mine-sweeper-type'

const createClickFactory = (buttonType: number, cellData: CellData[][], coord: Coord, bs: BoardSize): ClickHandler => {
  enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLCK };

  switch (buttonType) {
    case CLICKTYPE.LEFTCLICK:
      return new LeftClickHandler(cellData, coord, bs);
    case CLICKTYPE.RIGHTCLCK:
      return new RightClickHandler(cellData, coord);
    case CLICKTYPE.WHEELCLICK:
      return new WheelClickHandler(cellData, coord, bs);
  }
}

export default createClickFactory;