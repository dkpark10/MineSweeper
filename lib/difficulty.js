const easy = { row: 10, col: 10, numberOfMine: 10 };
const normal = { row: 16, col: 16, numberOfMine: 40 };
const hard = { row: 16, col: 30, numberOfMine: 99 };
const test = {row:5, col:5, numberOfMine:3};


const initMineData = (function(init){
  let instance;
  const row = init.row;
  const col = init.col;
  const numberofMine = init.numberOfMine;
  const mineBoard = Array.from(Array(init.row), () => Array(init.col).fill(0));
  const visited =  Array.from(Array(init.row), () => Array(init.col).fill(false));
  const flagBoard = Array.from(Array(init.row), () => Array(init.col).fill(0));
  const aroundNumberOfBoard = Array.from(Array(init.row), () => Array(init.col).fill(0));
  let extraCell = (init.row * init.col) - init.numberOfMine;

  function initiate() {
    return {
      row:                  row,
      col:                  col,
      numberOfMine:         numberofMine,
      mineBoard:            mineBoard,
      visited:              visited,
      flagBoard:            flagBoard,
      aroundNumberOfBoard:  aroundNumberOfBoard,
      extraCell:            extraCell
    };
  }

  return {
    getInstance: function() {
      if(!instance)
        instance = initiate();
      
      return instance;
    }
  }
})(test);

module.exports = test;