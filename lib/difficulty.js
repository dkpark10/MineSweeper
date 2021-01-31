// const buttonHandler = require("./buttonHandler");

// module.exports = (() => {
//   const row = 16, col = 30;
//   let numberOfMine = 99;
//   let mineBoard = [];
//   let markBoard = [];
//   let visited = [];
//   let aroundNumberOfBoard = [];

//   return {
//     getRow : () => { return row; },
//     getCol : () => { return col; },
//     getExtraNumberOfMine : () => {return numberOfMine;},
//     setExtraNumberOfMine: (value) => { numberOfMine = value; },
//     setInitMineBoard : () => { mineBoard = Array.from(Array(row), () => Array(col).fill(0));},
//     getMineBoard: () => {return mineBoard;},
//     setInitVisited:() =>{ visited = Array.from(Array(row), () => Array(col).fill(false));},
//     getVisited:() => {return visited;},
//     setInitMarkBoard:() => {markBoard = Array.from(Array(row), () => Array(col).fill(0));},
//     getMarkBoard:() => {return markBoard;},
//     initNumberOfBoard:() =>{
//       aroundNumberOfBoard = Array.from(Array(row), () => Array(col).fill(0));
//       for(let y=0; y<row; y++){
//         for(let x=0; x<col; x++){
//           aroundNumberOfBoard[y][x] = buttonHandler.getAroundNumOfCell(y,x, 
//             {mineBoard:mineBoard, row:row, col:col});
//         }
//       }
//     },
//     getNumberOfBoard:() =>{return aroundNumberOfBoard;},
//   };
// })();

const easy = { row: 9, col: 9, numberOfMine: 10 };
const normal = { row: 16, col: 16, numberOfMine: 40 };
const hard = { row: 16, col: 30, numberOfMine: 99 };

module.exports = {
  row : hard.row,
  col : hard.col,
  numberOfMine:hard.numberOfMine,
  mineBoard: Array.from(Array(hard.row), () => Array(hard.col).fill(0)),
  visited: Array.from(Array(hard.row), () => Array(hard.col).fill(false)),
  statusBoard: Array.from(Array(hard.row), () => Array(hard.col).fill(0)),
  aroundNumberOfBoard: Array.from(Array(hard.row), () => Array(hard.col).fill(0))
}