// 서버에서 값 넘겨줄 때 json 인터페이스
// {좌표, 상태, 숫자}
// 게임 오버일 때 mineboard 프로퍼티 하나 추가
'use strict';

module.exports = {

  Mine: 1,
  NoMine: 0,
  Flag: 1,
  directionY: [0, 0, 1, -1, -1, -1, 1, 1],
  directionX: [1, -1, 0, 0, -1, 1, -1, 1],

  buttonStatus:{
    END: 'END',
    NOTHING:'NOTHING',
    DISALBED:'DISABLED',
    NUMBERCELL:'NUMBERCELL',
    RELIVEFLAG:'RELIVEFLAG',
    SETFLAG:'SETFLAG'
  },

  mineData: function (mineData) {

    const row = mineData.row;
    const col = mineData.col;
    const numberOfMine = mineData.numberOfMine;
    let extraCell = mineData.extraCell;

    const mineBoard = mineData.mineBoard;
    const aroundNumberOfBoard = mineData.aroundNumberOfBoard;
    let flagBoard = mineData.flagBoard;
    let visited = mineData.visited;

    return {

      getRow:                   function () { return row; },
      getCol:                   function () { return col; },
      getNumberOfMine:          function () { return numberOfMine; },
      getMineBoard:             function () { return mineBoard; },
      getFlagBoard:             function () { return flagBoard; },
      getVisited:               function () { return visited; },
      getAroundNumberOfBoard:   function () { return aroundNumberOfBoard; },
      getExtraCell:             function ()  {return extraCell;},
      setVIsited:               function (value) { visited = value; },
      setFlagBoard:             function (value) { flagBoard = value },
      setExtraCell:             function (value) { extraCell = value; }
    };
  },

  plantMine: function (mineData) {                    // 화살표 함수는 this를 바인딩하지 않는다.

    const row = mineData.row;
    const col = mineData.col;
    let numberOfMine = mineData.numberOfMine;
    let mineBoard = mineData.mineBoard;

    while (numberOfMine) {

      const randomForRow = Math.floor(Math.random() * 100);
      const randomRow = randomForRow % row;
      const randomForCol = Math.floor(Math.random() * 100);
      const randomCol = randomForCol % col;

      if (mineBoard[randomRow][randomCol] === this.NoMine) {
        mineBoard[randomRow][randomCol] = this.Mine;
        numberOfMine--;
      }
    }
  },

  setFlagMark: function (minedata, coord) {

    const y = coord.y, x = coord.x;
    const flagBoard = minedata.getFlagBoard();
    const visited = minedata.getVisited();
    const currentStatus = flagBoard[y][x];

    if(visited[y][x] === true){
      return { coord: coord, status: this.buttonStatus.NOTHING, number: 0 };
    }
    else if ( currentStatus === !this.Flag) {
      flagBoard[y][x] = this.Flag;
      minedata.setFlagBoard(flagBoard);
      return { coord: coord, status: this.buttonStatus.RELIVEFLAG, number: 0 };
    }
    else {
      flagBoard[y][x] = !this.Flag;
      minedata.setFlagBoard(flagBoard);
      return { coord: coord, status: this.buttonStatus.SETFLAG, number: 0 };
    }
  },

  isClickedMine: function (mineData, coord) {

    const mineBoard = mineData.getMineBoard();
    const flagBoard = mineData.getFlagBoard();
    const y = coord.y, x = coord.x;
    if ( mineBoard[y][x] === this.Mine && flagBoard[y][x] !== this.Flag ){
      return true;
    }
    else return false;
  },

  isClickedFlag: function (mineData, coord) {

    const flagBoard = mineData.getFlagBoard();
    const y = coord.y, x = coord.x;

    if  (flagBoard[y][x] === this.Flag )
      return true;
    else
      return false;
  },

  breadthFirstSearch: function (minedata, coord) {

    const y = coord.y, x = coord.x;
    let visited = minedata.getVisited();
    let aroundNumberOfBoard = minedata.getAroundNumberOfBoard();
    let queue = [];
    let returnData = { returndata: [] };

    returnData.returndata.push({ coord: [y, x], status: this.buttonStatus.DISALBED, number: aroundNumberOfBoard[y][x] });
    if(returnData.returndata[0].number > 0) 
      return returnData;

    queue.push([y, x]);
    visited[y][x] = true;

    while (queue.length) {

      const curCoord = queue[0], currentY = curCoord[0], currentX = curCoord[1];
      returnData.returndata = returnData.returndata.concat(this.setDisabledAroundNumber(curCoord, minedata));
      queue.shift();

      for (let direction = 0; direction < 8; direction++) {

        let nextY = currentY + this.directionY[direction];
        let nextX = currentX + this.directionX[direction];

        if (this.isRange(nextY, nextX, minedata.getRow(), minedata.getCol())) continue;

        if (aroundNumberOfBoard[nextY][nextX] === 0 && visited[nextY][nextX] === false) {

          queue.push([nextY, nextX]);
          visited[nextY][nextX] = true;
          returnData.returndata.push({ coord: [nextY, nextX], status: this.buttonStatus.DISALBED, number: 0 });
        }
      }
    }
    minedata.setVIsited(visited);
    return returnData;
  },

  setDisabledAroundNumber: function (coord, minedata) {

    const y = coord[0], x = coord[1];
    const row = minedata.getRow(), col = minedata.getCol();
    let visited = minedata.getVisited();
    let aroundNumberOfBoard = minedata.getAroundNumberOfBoard();

    let ret = [];

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        
        if (this.isRange(i, j, row, col)) continue;
        if (y == i && x == j) continue;

        const num = aroundNumberOfBoard[i][j];
        if (visited[i][j] === false && aroundNumberOfBoard[i][j] !== 0) {
          visited[i][j] = true;
          ret.push({ coord: [i, j], status: this.buttonStatus.NUMBERCELL, number: num });
        }
      }
    }
    return ret;
  },

  isRightStickFlag: function(mineData, coord){
    
    const y = coord.y, x = coord.x;
    const row = minedata.getRow(), col = minedata.getCol();
    const flagBoard = mineData.getFlagBoard();
    const mineBoard = mineData.getMineBoard();
    const visited = mineData.getVisited();
    const aroundNumberOfCurCoord = mineData.getAroundNumberOfBoard()[y][x];
    let wrongcnt = 0, rightcnt = 0;

    let returnData = { returndata: [] };
  
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if ( this.isRange(i, j, row, col) ) 
          continue;
        if ( mineBoard[i][j] !== flagBoard[i][j] )  
          wrongcnt++;
        if (mineBoard[i][j] === flagBoard[i][j] && visited[i][j] === false) {
          returnData.returndata.push({coord:[i,j], status:'DISABLED', number:mineData.getAroundNumberOfBoard()[i][j]});
          rightcnt++;
        }
      }
    }

    if(rightcnt === aroundNumberOfCurCoord)
      return returnData;
    else if(wrongcnt === aroundNumberOfCurCoord)
      return { coord: coord, status: 'END', number: 0 };
    else
      return { coord: coord, status: 'NOTHING', number: 0 };
  },

  setAroundNumberOfCell: function (mineData) {

    const row = mineData.row;
    const col = mineData.col;
    let aroundNumberOfBoard = mineData.aroundNumberOfBoard;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        aroundNumberOfBoard[i][j] = this.getAroundNumberOfCell(mineData, i, j);
      }
    }
  },

  getAroundNumberOfCell: function (mineData, y, x) {

    const row = mineData.row;
    const col = mineData.col;
    const mineBoard = mineData.mineBoard;
    let aroundNumberOfMine = 0;

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.isRange(i, j, row, col)) continue;
        if (i == y && j == x) continue;
        if (mineBoard[i][j] === this.Mine)
          aroundNumberOfMine++;
      }
    }
    return aroundNumberOfMine;
  },

  isRange: function (y, x, row, col) {

    if (y < 0 || x < 0 || y >= row || x >= col) return true;   // 범위 벗어나면
    else return false;
  }
}