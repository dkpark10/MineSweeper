module.exports = {
  
  Mine:1,
  NoMine:0,
  row: null,
  col :null,
  directionY : [0,0,1,-1],
  directionX : [1,-1,0,0],

  status: function() {
    const init = 0, isflag = 1, isquestionMark = 2, disable = 3;
    return{
      getInitStatus :()=> { return init; },
      getisFlag : () => { return isflag; },
      getisQuestionMark : () => { return isquestionMark; },
      getDisable : () => { return disable; }
    };
  },

  setMineData: function (mineData) {
    this.row = mineData.row;
    this.col = mineData.col;
  },

  plantMine : function(mineData) {                            // 화살표 함수는 this를 바인딩하지 않는다.
    const row = mineData.row;
    const col = mineData.col;
    let numOfMine = mineData.numOfMine;
    let mineBoard = mineData.mineBoard;

    while (numOfMine) {

      const randomForRow = Math.floor(Math.random() * 100);
      const randomRow = randomForRow % row;
      const randomForCol = Math.floor(Math.random() * 100);
      const randomCol = randomForCol % col;

      if(mineBoard[randomRow][randomCol] === this.NoMine){
        mineBoard[randomRow][randomCol] = this.Mine;
        numOfMine--;
      }
    }
  },

  chainCollision: function(mineData, coord){
    let mineBoard = mineData.getMineBoard();
    let markBoard = mineData.getMarkBoard();
    const y = coord.y;
    const x = coord.x;

    switch(markBoard[y][x]){
      case this.status().getInitStatus():
        console.log('test');
        break;
    }
  },

  isRange: function (y,x) {
    const row = this.row;
    const col = this.col;;
    if (y < 0 || x < 0 || y >= row || x >= col) return true;   // 범위 벗어나면
    else return false;
  },

  getAroundNumberOfMine: function(mineBoard,y,x){
    let aroundNumberOfMine = 0;
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if(this.isRange(i,j))
          continue;
        
        if(mineBoard[i][j] === this.Mine)
          aroundNumberOfMine++;
      }
    }
    return aroundNumberOfMine;
  },

  setAroundNumberOfCell:function (mineData){
    const row = mineData.row;
    const col = mineData.col;
    const mineBoard = mineData.mineBoard;
    let aroundNumberOfBoard = mineData.aroundNumberOfBoard;
    
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        aroundNumberOfBoard[i][j] = this.getAroundNumberOfMine(mineBoard,i,j);
      }
    }
  },
}
