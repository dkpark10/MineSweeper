import TileHandler from './move_tile';

export default class DownMoveTileHandler extends TileHandler {
  // eslint-disable-next-line
  constructor(origin: number[][]) {
    super(origin);
  }

  public move(): this {
    for (let row = 0; row < this.BOARD_SIZE; row += 1) {
      const tmp: number[] = [];
      for (let col = this.BOARD_SIZE - 1; col >= 0; col -= 1) {
        if (this.origin[col][row] !== 0) {
          tmp.push(this.origin[col][row]);
        }
      }

      if (tmp.length === 1) {
        const [value] = tmp;
        this.newBoard[this.BOARD_SIZE - 1][row] = value;
        // eslint-disable-next-line
        continue;
      }

      const combinedBoard = this.combine(tmp);

      let idx = this.BOARD_SIZE - 1;
      for (let i = 0; i < combinedBoard.length; i += 1) {
        if (combinedBoard[i] === 0) {
          // eslint-disable-next-line
          continue;
        }
        this.newBoard[idx][row] = combinedBoard[i];
        idx -= 1;
      }
    }

    return this;
  }
}
