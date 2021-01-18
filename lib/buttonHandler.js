module.exports = {

  plantMine: function (mineArr, extranum_of_Mine) {
    const row = this.row;
    const col = this.col;
    const numofMine = this.numofMine;
    const percentage = Math.round((row * col) / numofMine);   // 지뢰 심을 확률

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {

        if (mineArr[i][j] === this.isMine)
          continue;
        const random = Math.floor(Math.random() * 100);
        mineArr[i][j] = random <= 100 / percentage ? 1 : 0;

        if (mineArr[i][j] === this.isMine) {
          extranum_of_Mine--;
        }
        if (extranum_of_Mine == 0) return;
      }
    }
    if (extranum_of_Mine > 0) {
      this.plantMine(mineArr, extranum_of_Mine);     // 지뢰를 다 심지 못하였다면 재귀적으로  다시
    }
  },

  chainCollision: function (y, x) {
    this.visited[y][x] = true;

    for (let dir = 0; dir < 4; dir++) {
      let nextY = y + this.directionY[i];
      let nextX = x + this.directionX[i];
      if (this.visited[nextY][nextX] === false) {
        this.chainCollision(nextY, nextX);
      }
    }
  },

  isRange: function (y, x) {
    const row = this.row;
    const col = this.col;
    if (y < 0 || x < 0 || y >= row || x >= col) return false;
    else return true;
  },

  getAroundNumOfMine: function (y, x) {
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