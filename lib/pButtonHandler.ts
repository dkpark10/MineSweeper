'use strict';

// 버튼 이벤트 
// 주위에 지뢰가 하나 없는 청정경우일 경우에만 버튼 disabled 셋팅
// 지뢰가 아닌 칸이지만 주위에 지뢰가 있는경우 disabled를 셋팅하면 안됨 

interface Coord{
  y:number;
  x:number;
}

interface MineBoard {
  mine: boolean;
  flag: boolean;
  visited: boolean;
  aroundNumber: number;
}

interface MineData {
  row: number;
  col: number;
  numberOfMine: number;
  extraCell: number;
  board: MineBoard[][];
}

interface ResponseJSON {
  y: number;
  x: number;
  status: EventStatus;
  num: number;
}

export enum EventStatus {
  END,
  NOTHING,
  DISABLED,
  NUMBERCELL,
  SETFLAG,
  RELIVEFLAG
}

export class ButtonHandler {

  private readonly row: number;
  private readonly col: number;
  private readonly numberOfMine: number;
  private extraCell: number;
  private board: MineBoard[][];

  constructor(sessionData: MineData) {
    this.row = sessionData.row;
    this.col = sessionData.col;
    this.numberOfMine = sessionData.numberOfMine;
    this.extraCell = sessionData.extraCell;
    this.board = sessionData.board;
  }

  getRow(): number { return this.row; }
  getCol(): number { return this.col; }
  getNumberOfMine(): number { return this.numberOfMine; }
  getExtraCell(): number { return this.extraCell; }
  getBoard(): MineBoard[][] { return this.board; }

  setExtraCell(arg: number) { this.extraCell = arg; }
  setBoard(arg: MineBoard[][]) { this.board = arg; }

  plantMine() {

    let extraNumberOfMine: number = this.numberOfMine;

    while (extraNumberOfMine) {

      const randomForRow: number = Math.floor(Math.random() * 100);
      const randomRow: number = randomForRow % this.row;
      const randomForCol: number = Math.floor(Math.random() * 100);
      const randomCol: number = randomForCol % this.col;

      if (this.board[randomRow][randomCol].mine === false) {
        this.board[randomRow][randomCol].mine = true;
        extraNumberOfMine--;
      }
    }
  }

  setFlag(y: number, x: number): ResponseJSON {

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

  isClickMine(y: number, x: number): boolean {

    if (this.board[y][x].flag === true) {          // 지뢰라도 깃발이라면 넘김
      return false;
    } else if (this.board[y][x].mine === true) {
      return true;
    }

    return false;
  }

  isClickFlag(y: number, x: number): boolean {
    return this.board[y][x].flag === true ? true : false;
  }

  chainConflict(y: number, x: number): ResponseJSON[] {
    
    let ret: ResponseJSON[];
    let q: Array<Coord>;


    return ret;
  }

  calculAroundMineNumberOfCell(y: number, x: number): number {

    let ret: number = 0;
    for (let i: number = y - 1; i <= y + 1; i++) {
      for (let j: number = x - 1; j <= x + 1; j++) {
        if(this.checkOutofRange(i,j)) continue;
        if(this.board[y][x].mine === true)
          ret++;
      }
    }
    return ret;
  }

  setAroundMineNumberOfCell() {

    const row: number = this.row;
    const col: number = this.col;

    for (let i: number = 0; i < row; i++) {
      for (let j: number = 0; j < row; j++) {
        this.board[i][j].aroundNumber = this.calculAroundMineNumberOfCell(i, j);
      }
    }
  }

  checkOutofRange(y: number, x: number): boolean {         // 범위 밖이면 true
    return y < 0 || x < 0 || y >= this.row || x >= this.col;
  }
}
