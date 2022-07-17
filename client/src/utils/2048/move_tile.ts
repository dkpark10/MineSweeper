export interface NewTileResult {
  board: number[][];
  score: number;
}

export default abstract class TileHandler {
  protected readonly BOARD_SIZE: number = 4 as const;

  protected readonly origin: number[][] = [];

  protected newBoard: number[][] = [];

  protected score: number = 0;

  constructor(origin: number[][]) {
    this.origin = origin;
    this.newBoard = Array.from({ length: 4 }, (v, i) => new Array(4).fill(0));
  }

  public getResult(): NewTileResult {
    return {
      board: this.newBoard,
      score: this.score,
    };
  }

  public combine(list: number[]) {
    const ret = [...list];
    let idx = 0;
    while (idx < list.length - 1) {
      if (list[idx] === list[idx + 1]) {
        this.score += list[idx + 1] * 2;
        ret[idx + 1] *= 2;
        ret[idx] = 0;
        idx += 2;
      } else {
        idx += 1;
      }
    }
    return ret;
  }

  abstract move(): this;
}
