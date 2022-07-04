import TileHandler from './move_tile';

export default class LeftMoveTileHandler extends TileHandler {
  // eslint-disable-next-line
  constructor(origin: number[][]) {
    super(origin);
  }

  public move(): this {
    for (let row = 0; row < this.BOARD_SIZE; row += 1) {
      const tmp: number[] = [];
      for (let col = 0; col < this.BOARD_SIZE; col += 1) {
        if (this.origin[row][col] !== 0) {
          tmp.push(this.origin[row][col]);
        }
      }

      if (tmp.length === 1) {
        const [value] = tmp;
        this.newBoard[row][0] = value;
        // eslint-disable-next-line
        continue;
      }

      const combinedBoard = this.combine(tmp);

      let idx = 0;
      for (let i = 0; i < combinedBoard.length; i += 1) {
        if (combinedBoard[i] === 0) {
          // eslint-disable-next-line
          continue;
        }
        this.newBoard[row][idx] = combinedBoard[i];
        idx += 1;
      }
    }

    return this;
  }
}
