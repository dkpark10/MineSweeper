module.exports = {

  Mine: 1,
  NoMine: 0,
  directionY: [0, 0, 1, -1, -1, -1, 1, 1],
  directionX: [1, -1, 0, 0, -1, 1, -1, 1],

  mineData: function (mineData) {

    const row = mineData.row;
    const col = mineData.col;
    let numberOfMine = mineData.numberOfMine;
    let mineBoard = mineData.mineBoard;
    let statusBoard = mineData.statusBoard;
    let visited = mineData.visited;
    let aroundNumberOfBoard = mineData.aroundNumberOfBoard;

    return {
      getRow: function () { return row; },
      getCol: function () { return col; },
      getNumberOfMine: function () { return numberOfMine; },
      getMineBoard: function () { return mineBoard; },
      getStatusBoard: function () { return statusBoard; },
      getVisited: function () { return visited; },
      getAroundNumberOfBoard: function () { return aroundNumberOfBoard; },
      setVIsited: function (value) { visited = value; },
      setStatuBoard: function (value) { statusBoard = value }
    };
  },

  status: function () {
    const init = 0, isflag = 1, isquestionMark = 2, disable = 3;
    return {
      getInitStatus: () => { return init; },
      getisFlag: () => { return isflag; },
      getisQuestionMark: () => { return isquestionMark; },
      getDisable: () => { return disable; }
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

  isClickedMine: function (mineData, coord) {
    const mineBoard = mineData.getMineBoard();
    const statusBoard = mineData.getStatusBoard();
    const y = coord.y, x = coord.x;
    if (mineBoard[y][x] === this.Mine && statusBoard[y][x] === this.status().getInitStatus() ||
      mineBoard[y][x] === this.Mine && statusBoard[y][x] === this.status().getisQuestionMark()) {
      return true;
    } else {
      return false;
    }
  },

  isClickedFlag: function (mineData, coord) {
    const statusBoard = mineData.getStatusBoard();
    const y = coord.y, x = coord.x;
    
    if (statusBoard[y][x] === this.status().getisFlag())
      return true;
    else 
      return false;
  },

  isAroundMineMoreThanOne: function (mineData, coord) {
    const mineBoard = mineData.getMineBoard();
    const aroundNumberOfBoard = mineData.getAroundNumberOfBoard();
    const y = coord.y, x = coord.x;

    if(mineBoard[y][x] === this.NoMine && aroundNumberOfBoard[y][x] !== 0)
     return true;
    else
     return false;
  },

  breadthFirstSearch: function (minedata, coord) {
    const y = coord.y, x = coord.x;
    let visited = minedata.getVisited();
    let statusBoard = minedata.getStatusBoard();
    let aroundNumberOfBoard = minedata.getAroundNumberOfBoard();
    let queue = [];
    let returnData = [];

    queue.push([y, x]);
    returnData.push({ coord: [y, x], status: 'disabled', number: 0 });
    visited[y][x] = true;

    while (queue.length) {
      const curCoord = queue[0], curY = curCoord[0], curX = curCoord[1];
      statusBoard[curY][curX] = this.status().getDisable();
      returnData.concat(this.setDisabledAroundNumber(curCoord, minedata));
      queue.shift();

      for (let direction = 0; direction < 8; direction++) {
        let nextY = curY + this.directionY[direction];
        let nextX = curX + this.directionX[direction];

        if(this.isRange(nextY, nextX, minedata.getRow(), minedata.getCol())) continue;

        if (aroundNumberOfBoard[nextY][nextX] === 0 && visited[nextY][nextX] === false){

          queue.push([nextY, nextX]);
          visited[nextY][nextX] = true;
          statusBoard[curY][curX] = this.status().getDisable();
          returnData.push({ coord: [nextY, nextX], status: 'disabled' , number : 0});
        }
      }
    }
    minedata.setVIsited(visited);
    minedata.setStatuBoard(statusBoard);
    return returnData;
  },

  setDisabledAroundNumber: function (coord, minedata) {
    const y = coord.y, x = coord.x;
    const row = minedata.getRow(), col = minedata.getCol();
    let visited = minedata.getVisited();
    let statusBoard = minedata.getStatusBoard();
    let aroundNumberOfBoard = minedata.getAroundNumberOfBoard();
    let ret = {};

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.isRange(i, j, row, col))
          continue;
        if(!visited[i][j] === false && aroundNumberOfBoard[i][j] !== 0){
          visited[i][j] = true;
          ret.push({coord:[i,j], status: 'disabled', num : aroundNumberOfBoard[i][j]});
          statusBoard[i][j] = this.status().getDisable();
        }
      }
    }
    return ret;
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
