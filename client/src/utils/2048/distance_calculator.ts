export default class DistanceCalculator {
  private readonly prev: number[][] = [];

  private readonly result: number[][] = [];

  private readonly direction: string;

  private readonly TILE_WIDTH: number = 4;

  constructor(p: number[][], d: string) {
    this.direction = d;
    this.result = Array.from(Array(4), () => Array(4).fill(0));

    switch (this.direction) {
      case 'ArrowRight':
        this.prev = this.turnSide(p);
        break;
      case 'ArrowUp':
        this.prev = this.rotate270(p);
        break;
      case 'ArrowDown':
        this.prev = this.rotate90(p);
        break;
      default:
        this.prev = p;
        break;
    }
  }

  public getTileData() {
    switch (this.direction) {
      case 'ArrowRight':
        return this.turnSide(this.result);
      case 'ArrowUp':
        return this.rotate90(this.result);
      case 'ArrowDown':
        return this.rotate270(this.result);
      default:
        return this.result;
    }
  }

  // 옆으로 뒤집는다.
  public turnSide(arr: number[][]) {
    const n = this.result.length;
    const ret = Array.from(Array(n), () => new Array(n));
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        ret[i][j] = arr[i][n - 1 - j];
      }
    }
    return ret;
  }

  public rotate270(arr: number[][]) {
    const n = this.result.length;
    const ret = Array.from(Array(n), () => new Array(n));
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        ret[i][j] = arr[j][n - 1 - i];
      }
    }
    return ret;
  }

  public rotate90(arr: number[][]) {
    const n = this.result.length;
    const ret = Array.from(Array(n), () => new Array(n));
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        ret[i][j] = arr[n - 1 - j][i];
      }
    }
    return ret;
  }

  public run(): this {
    for (let row = 0; row < this.TILE_WIDTH; row += 1) {
      // 임시로 담을 변수
      const tmp = [];
      // 움직일 거리를 담는 객체
      const moveList: { [key: string]: number } = {};
      let distance = 0;

      for (let col = 0; col < 4; col += 1) {
        // y, x 인덱스 키값
        const index = row * 4 + col;

        if (this.prev[row][col] !== 0) {
          tmp.push({
            index,
            value: this.prev[row][col],
          });

          moveList[index] = distance;

          // // 움직여야 하는 타일이라면
          // if (distance > 0) {
          //   moveList[index].isDelete = true;
          // }
        } else {
          moveList[index] = 0;
          distance += 1;
        }
      }

      for (let i = 0; i < tmp.length - 1; i += 1) {
        if (tmp[i].value !== tmp[i + 1].value) {
          // eslint-disable-next-line
          continue;
        }

        tmp[i].value *= 2;
        tmp[i + 1].value = 0;

        // 합친 부분에서 움직인 인덱스 값의 거리를 증감
        moveList[tmp[i + 1].index] += 1;

        // moveList[tmp[i].index].value = tmp[i].value;
        // moveList[tmp[i + 1].index].value = 0;
        // moveList[tmp[i + 1].index].isDelete = true;

        // 합쳤으면 그 다음 값들의 모든 거리를 1 증감 시켜줘야 함
        const next = i + 2;
        if (tmp.length <= next) {
          // eslint-disable-next-line
          continue;
        }

        for (let j = tmp[next].index; j < (row * 4 + 4); j += 1) {
          if (this.prev[row][j] !== 0) {
            moveList[j] += 1;
          }
        }
      }

      Object.entries(moveList).forEach((ele, col) => {
        const [, val] = ele;
        this.result[row][col] = val;
      });
    }
    return this;
  }
}
