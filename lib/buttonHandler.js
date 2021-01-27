module.exports = {
  isMine:1,
  Status: () => {
    const init = 0, isflag = 1, isquestionMark = 2, disable = 3;
    return{
      getInitStatus :()=> { return init; },
      getisFlag : () => { return isflag; },
      getisQuestionMark : () => { return isquestionMark; },
      getDisable : () => { return disable; }
    };
  },

  plantMine:  function(mineData) {                            // 화살표 함수는 this를 바인딩하지 않는다.
    const row = mineData.getRow();
    const col = mineData.getCol();
    let numofMine = mineData.getExtraNumberOfMine();
    let map = mineData.getMineBoard();
    const percentage = Math.round((row * col) / numofMine);   // 지뢰 심을 확률

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (map[i][j] === this.isMine)
          continue; 

        const random = Math.floor(Math.random() * 100);
        map[i][j] = random <= (100 / percentage) ? 1 : 0;
        if (map[i][j] === this.isMine) {
          mineData.setExtraNumberOfMine(numofMine--);
        }
        if (mineData.getExtraNumberOfMine() == 0) return;
      }
    }

    if (mineData.getExtraNumberOfMine() > 0) {
      this.plantMine(mineData);     // 지뢰를 다 심지 못하였다면 재귀적으로  다시
    }
  },

  chainCollision:  (y, x) => {
    this.visited[y][x] = true;

    for (let dir = 0; dir < 4; dir++) {
      let nextY = y + this.directionY[i];
      let nextX = x + this.directionX[i];
      if (this.visited[nextY][nextX] === false) {
        this.chainCollision(nextY, nextX);
      }
    }
  },

  isRange:  function(y,x, boardSize) {
    const row = boardSize.row;
    const col = boardSize.col;
    if (y < 0 || x < 0 || y >= row || x >= col) return false;
    else return true;
  },

  getAroundNumOfCell: (y, x, mineBoard) => {
    let ret = 0;
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.isRange(i, j, {row:mineBoard.getRow(), col:mineBoard.getCol()}) === false)
          continue;
        if (this.mineBoard[i][j] === this.isMine) {
          ret++;
        }
      }
    }return ret;
  }
}
