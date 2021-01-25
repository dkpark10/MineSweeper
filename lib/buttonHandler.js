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

  plantMine:  (mineData) => {
    const row = mineData.getRow();
    const col = mineData.getCol();
    let numofMine = mineData.getNumofMine();
    let map = mineData.getMap();
    const percentage = Math.round((row * col) / numofMine);   // 지뢰 심을 확률

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {

        if (map[i][j] === this.isMine)
          continue;
        const random = Math.floor(Math.random() * 100);
        map[i][j] = random <= 100 / percentage ? 1 : 0;

        if (map[i][j] === this.isMine) {
          mineData.setNumofMine(numofMine--);
        }
        if (mineData.getNumofMine() == 0) return;
      }
    }

    if (mineData.getNumofMine() > 0) {
      this.plantMine(mineData, mineData.getNumofMine());     // 지뢰를 다 심지 못하였다면 재귀적으로  다시
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

  isRange:  (y, x) => {
    const row = this.row;
    const col = this.col;
    if (y < 0 || x < 0 || y >= row || x >= col) return false;
    else return true;
  },

  getAroundNumOfMine: (y, x) => {
    let ret = 0;
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (this.isRange(i, j) === false)
          continue;
        if (this.map[i][j] === this.isMine) {
          ret++;
        }
      }
    }return ret;
  }
}
