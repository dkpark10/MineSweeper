module.exports = function(sessionMine) {
  const row = sessionMine.row;
  const col = sessionMine.col;
  let numberOfMine = sessionMine.numOfMine;
  let mineBoard = sessionMine.mineBoard;
  let markBoard = sessionMine.markBoard;
  let visited = sessionMine.visited;
  let aroundNumberOfBoard = sessionMine.aroundNumberOfBoard; 

  return {
    getRow : () => { return row; },
    getCol : () => { return col; },
    getNumberOfMine : () => {return numberOfMine;},
    setNumberOfMine: (value) => { numberOfMine = value; },
    getMineBoard: () => {return mineBoard;},
    getVisited:() => {return visited;},
    getMarkBoard:() => {return markBoard;},
    getNumberOfBoard:() =>{return aroundNumberOfBoard;},
  };
}