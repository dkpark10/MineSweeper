module.exports = {
  
  Mine:1,
  NoMine:0,
  directionY : [0,0,1,-1],
  directionX : [1,-1,0,0],

  mineData : function(mineData) {

    const row = mineData.row;
    const col = mineData.col;
    let numberOfMine = mineData.numberOfMine;
    let mineBoard = mineData.mineBoard;
    let statusBoard = mineData.statusBoard;
    let visited = mineData.visited;
    let aroundNumberOfBoard = mineData.aroundNumberOfBoard;

    return{
      getRow: function(){return row;},
      getCol:function(){return col;},
      getNumberOfMine: function() {return numberOfMine;},
      getMineBoard:function(){return mineBoard;},
      getStatusBoard:function(){return statusBoard;},
      getVisited:function(){return visited;},
      getAroundNumberOfBoard:function(){return aroundNumberOfBoard;}
    };
  },

  status: function() {
    const init = 0, isflag = 1, isquestionMark = 2, disable = 3;
    return{
      getInitStatus :()=> { return init; },
      getisFlag : () => { return isflag; },
      getisQuestionMark : () => { return isquestionMark; },
      getDisable : () => { return disable; }
    };
  },

  plantMine : function(mineData) {                    // 화살표 함수는 this를 바인딩하지 않는다.
    const row = mineData.row;
    const col = mineData.col;
    let numberOfMine = mineData.numberOfMine;
    let mineBoard = mineData.mineBoard;

    while (numberOfMine) {

      const randomForRow = Math.floor(Math.random() * 100);
      const randomRow = randomForRow % row;
      const randomForCol = Math.floor(Math.random() * 100);
      const randomCol = randomForCol % col;

      if(mineBoard[randomRow][randomCol] === this.NoMine){
        mineBoard[randomRow][randomCol] = this.Mine;
        numberOfMine--;
      }
    }
  },

  isClickedMine: function(sessMineData, coord){
    let minedata = this.mineData(sessMineData);
    const y = coord.y;
    const x = coord.x;
    let visited = minedata.getVisited();
    let queue = [];
    let returnJson = {};

  },

  breadthFirstSearch : function(sessMineData, coord){
    const minedata = this.mineData(sessMineData);
    const y = coord.y, x = coord.x;
    let visited = minedata.getVisited();
    let queue = [];
    let returnJson = {};

    queue.push({y,x});
    visited[y][x] = true;
    while(queue.length){
      const curCoord = queue[0];
      queue.shift();
      
      for(let direction = 0; direction < 4; direction++){
        const nextY = curCoord.y + this.directionY[direction];
        const nextX = curCoord.x + this.directionX[direction];
      }
    }
    minedata = null;        // 클로저 사용 후 반드시 메모리 반납
  },

  isRange: function (y,x,row,col) {
    if (y < 0 || x < 0 || y >= row || x >= col) return true;   // 범위 벗어나면
    else return false;
  },

  getAroundNumberOfCell: function(mineData,y,x){
    const row = mineData.row;
    const col = mineData.col;
    const mineBoard = mineData.mineBoard;
    let aroundNumberOfMine = 0;

    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if(this.isRange(i,j,row,col))
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
    let aroundNumberOfBoard = mineData.aroundNumberOfBoard;
    
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        aroundNumberOfBoard[i][j] = this.getAroundNumberOfCell(mineData,i,j);
      }
    }
  },
}
