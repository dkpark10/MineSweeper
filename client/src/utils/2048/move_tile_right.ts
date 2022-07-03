import TileHandler from './move_tile';

export default class RightMoveTileHandler extends TileHandler {
  public move(): this {
    for (let row = 0; row < this.BOARD_SIZE; row += 1) {
      const tmp: number[] = [];
      for (let col = this.BOARD_SIZE - 1; col >= 0; col -= 1) {
        if (this.origin[row][col] !== 0) {
          tmp.push(this.origin[row][col]);
        }
      }

      if (tmp.length === 1) {
        const [, value] = tmp;
        this.newBoard[row][this.BOARD_SIZE - 1] = value;
        // eslint-disable-next-line
        continue;
      }

      this.combine(tmp);

      let idx = this.BOARD_SIZE - 1;
      for (let i = 0; i < tmp.length; i += 1) {
        if (tmp[i] === 0) {
        // eslint-disable-next-line
          continue;
        }
        this.newBoard[row][idx] = tmp[i];
        idx -= 1;
      }
    }

    return this;
  }
}
