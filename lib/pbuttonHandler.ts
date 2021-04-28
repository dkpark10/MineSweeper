'use strict';

// 버튼 이벤트 
// 주위에 지뢰가 하나 없는 청정경우일 경우에만 버튼 disabled 셋팅
// 지뢰가 아닌 칸이지만 주위에 지뢰가 있는경우 disabled를 셋팅하면 안됨 


import { MineBoard, MineData, Coord, EventStatus, ResponseJSON, cloneObject } from './commonutility'

export class ButtonHandler {

  private static instance : ButtonHandler;
  private row: number;
  private col: number;
  private numberOfMine: number;
  private extraCell: number;
  private board: MineBoard[][];

  public readonly directionY: number[] = [0, 0, 1, -1, -1, -1, 1, 1];
  public readonly directionX: number[] = [1, -1, 0, 0, -1, 1, -1, 1];

  private constructor(sessionData: MineData) { 
    this.row = sessionData.row;
    this.col = sessionData.col;
    this.numberOfMine = sessionData.numberOfMine;
    this.extraCell = sessionData.extraCell;
    this.board = sessionData.board;
  }

  public static getInstance(sessionData: MineData) {
    return this.instance || (this.instance = new this(sessionData));
  }

  public getRow(): number { return this.row; }
  public getCol(): number { return this.col; }
  public getNumberOfMine(): number { return this.numberOfMine; }
  public getExtraCell(): number { return this.extraCell; }
  public getBoard(): MineBoard[][] { return this.board; }
  public setExtraCell(arg: number) { this.extraCell = arg; }
  public setBoard(arg: MineBoard[][]) { this.board = arg; }

  public plantMine() {

    let extraNumberOfMine: number = this.numberOfMine;

    while (extraNumberOfMine) {

      const randomForRow: number = Math.floor(Math.random() * 100);
      const randomRow: number = randomForRow % this.row;
      const randomForCol: number = Math.floor(Math.random() * 100);
      const randomCol: number = randomForCol % this.col;

      if (this.board[randomRow][randomCol].mine === 0) {
        this.board[randomRow][randomCol].mine = 1;
        extraNumberOfMine--;
      }
    }
  }

  public setFlag(y: number, x: number): ResponseJSON {

    const isFlag = this.board[y][x].flag;
    let ret: ResponseJSON;

    if (this.board[y][x].visited === true) {      // 방문된곳이면 아무런 이벤트를 발생하지 아니한다.
      ret = { y: y, x: x, status: EventStatus.NOTHING, num: 0 };
    }
    else if (isFlag === false) {
      this.board[y][x].flag = true;
      ret = { y: y, x: x, status: EventStatus.SETFLAG, num: 0 };
    }
    else {
      this.board[y][x].flag = false;
      ret = { y: y, x: x, status: EventStatus.RELIVEFLAG, num: 0 };
    }

    return ret;
  }

  public isClickMine(y: number, x: number): boolean {

    if (this.board[y][x].flag === true) {          // 지뢰라도 깃발이라면 넘김
      return false;
    } else if (this.board[y][x].mine === 1) {
      return true;
    }

    return false;
  }

  public  isClickFlag(y: number, x: number): boolean {
    return this.board[y][x].flag === true ? true : false;
  }

  public  chainConflict(y: number, x: number): ResponseJSON[] {

    let ret: ResponseJSON[] = new Array();
    let q: Array<Coord> = new Array();
    const cellNumber: number = this.board[y][x].aroundNumber;
    
    q.push({ y: y, x: x });
    this.board[y][x].visited = true;
    ret.push(
      {
        y: y,
        x: x, 
        status: cellNumber ? EventStatus.NUMBERCELL : EventStatus.DISABLED, 
        num : cellNumber
      });
    
    while (q.length) {

      const currenty: number = q[0].y;
      const currentx: number = q[0].x;
      q.shift();

      for(let dir:number = 0; dir < 8; dir++){

        const nexty: number = currenty + this.directionY[dir];
        const nextx: number = currentx + this.directionX[dir];

        if(this.checkOutofRange(nexty, nextx)) continue;

        if (this.board[y][x].aroundNumber === 0 && this.board[y][x].visited !== false) {
          
          const nextCellNumber: number = this.board[nexty][nextx].aroundNumber;
          ret.push(
            {
              y: nexty,
              x: nextx, 
              status: nextCellNumber ? EventStatus.NUMBERCELL : EventStatus.DISABLED, 
              num : nextCellNumber
            });
          this.board[nexty][nextx].visited = true;
          q.push({ y: nexty, x: nextx });
        }
      }
    }

    return ret;
  }

  public calculAroundMineNumberOfCell(y: number, x: number): number {

    let ret: number = 0;
    for (let i: number = y - 1; i <= y + 1; i++) {
      for (let j: number = x - 1; j <= x + 1; j++) {
        if (this.checkOutofRange(i, j)) continue;
        if (this.board[y][x].mine === 1)
          ret++;
      }
    }
    return ret;
  }

  public  setAroundMineNumberOfCell() {

    const row: number = this.row;
    const col: number = this.col;

    for (let i: number = 0; i < row; i++) {
      for (let j: number = 0; j < row; j++) {
        this.board[i][j].aroundNumber = this.calculAroundMineNumberOfCell(i, j);
      }
    }
  }

  public checkOutofRange(y: number, x: number): boolean {         // 범위 밖이면 true
    return y < 0 || x < 0 || y >= this.row || x >= this.col;
  }
}