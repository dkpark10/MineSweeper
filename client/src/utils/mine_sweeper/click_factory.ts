import { Coord, CellData, BoardSize } from 'mine-sweeper-type';
import ClickHandler from './click_handler';
import LeftClickHandler from './left_click_handler';
import RightClickHandler from './right_click_handler';
import WheelClickHandler from './wheel_click_handler';

const createClickFactory = (
  buttonType: number,
  cellData: CellData[][],
  coord: Coord,
  bs: BoardSize,
): ClickHandler => {
  const LEFTCLICK = 0;
  const WHEELCLICK = 1;

  if (LEFTCLICK === buttonType) {
    return new LeftClickHandler(cellData, coord, bs);
  }
  if (WHEELCLICK === buttonType) {
    return new WheelClickHandler(cellData, coord, bs);
  }

  return new RightClickHandler(cellData, coord);
};

export default createClickFactory;
