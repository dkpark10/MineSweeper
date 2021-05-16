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
  public isGameClear():boolean { return this.extraCell <= 0; }

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

  public isClickFlag(y: number, x: number): boolean {
    return this.board[y][x].flag === true ? true : false;
  }

  // 연쇄충돌을 일으킨다.
  public chainConflict(y: number, x: number): ResponseJSON[] {

    let ret: ResponseJSON[] = new Array();
    let q: Array<Coord> = new Array();
    
    q.push({ y: y, x: x });
    this.board[y][x].visited = true;
    ret.push({ y: y, x: x, status: EventStatus.DISABLED, num: -1 });
    let extraCell: number = this.extraCell - 1;
    
    while (q.length) {

      const currenty: number = q[0].y;
      const currentx: number = q[0].x;
      q.shift();

      for(let dir:number = 0; dir < 8; dir++){

        const nexty: number = currenty + this.directionY[dir];
        const nextx: number = currentx + this.directionX[dir];

        if(this.checkOutofRange(nexty, nextx)) continue;
        if(this.board[nexty][nextx].flag === true) continue;

        if (this.board[nexty][nextx].aroundNumber === 0 && this.board[nexty][nextx].visited === false) {
          extraCell--;
          ret.push({ y: nexty, x: nextx, status: EventStatus.DISABLED, num: -1 });
          this.board[nexty][nextx].visited = true;
          q.push({ y: nexty, x: nextx });
        }
      }
    }

    ret.map((element: ResponseJSON) => {
      
      const y: number = element.y;
      const x: number = element.x;

      for (let dir: number = 0; dir < 8; dir++) {
        
        const nexty: number = y + this.directionY[dir];
        const nextx: number = x + this.directionX[dir];
        
        if(this.checkOutofRange(nexty, nextx)) continue;
        if(this.board[nexty][nextx].flag === true) continue;
        if(this.board[nexty][nextx].visited === true) continue;

        const numOfCell: number = this.board[nexty][nextx].aroundNumber;
        extraCell--;
   
        this.board[nexty][nextx].visited = true;        
        ret.push({ y: nexty, x: nextx, status: EventStatus.NUMBERCELL, num: numOfCell });
      }
    });

    this.extraCell = extraCell;
    if(this.isGameClear()){
      ret.push({ y: -1, x: -1, status: EventStatus.END, num: -1 });
    }

    return ret;
  }

  public wheelClickHandle(y: number, x:number): ResponseJSON[] {

    let ret: ResponseJSON[] = new Array();

    // 휠클릭했을 때 방문한곳과, 깃발이 없어야 한다.
    if(this.board[y][x].flag === true && this.board[y][x].visited !== false){
      return [{ y: y, x: x, status: EventStatus.NOTHING, num: -1 }];
    }

    // 게임오버
    if(this.isRightSetFlag(y,x) === false){
      return [{ y: y, x: x, status: EventStatus.END, num: -1 }];
    }

    for(let i:number = y - 1; i<= y + 1; i++){
      for(let j:number = x - 1; j<= x + 1; j++){

        if (i == y && x == j) continue;
        if(this.checkOutofRange(i,j)) continue;

        if(this.board[i][j].visited === true || this.board[i][j].flag === true) 
          continue;

        if(this.board[i][j].aroundNumber > 0){
          const numbercell: number = this.board[i][j].aroundNumber;
          ret.push({ y: i, x: j, status: EventStatus.NUMBERCELL, num: numbercell });
        }
        else {
          ret = ret.concat(this.chainConflict(i,j));
        }
      }
    }

    return ret;
  }

  public isRightSetFlag(y: number, x: number): boolean {
    
    let flagcnt:number = 0;
    const aroundNumberofCell :number = this.board[y][x].aroundNumber;

    for(let i:number = y - 1; i<= y + 1; i++){
      for(let j:number = x - 1; j<= x + 1; j++){

        if(i == y && j == x) continue;
        if(this.checkOutofRange(i,j)) continue;

        if(this.board[i][j].visited === true) continue;
        
        if(this.board[i][j].flag === true && this.board[i][j].mine === 1){
          flagcnt++;
        }
      }
    }

    return flagcnt === aroundNumberofCell ? true : false;
  }

  public calculAroundMineNumberOfCell(y: number, x: number): number {

    let ret: number = 0;
    for (let i: number = y - 1; i <= y + 1; i++) {
      for (let j: number = x - 1; j <= x + 1; j++) {
        if (this.checkOutofRange(i, j)) continue;
        if (this.board[i][j].mine === 1)
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