const easy = { row: 10, col: 10, numberOfMine: 10 };
const normal = { row: 16, col: 16, numberOfMine: 40 };
const hard = { row: 16, col: 30, numberOfMine: 99 };
const test = {row:5, col:5, numberOfMine:3};

// module.exports = {
//   row : easy.row,
//   col : easy.col,
//   numberOfMine:easy.numberOfMine,
//   mineBoard: Array.from(Array(easy.row), () => Array(easy.col).fill(0)),
//   visited: Array.from(Array(easy.row), () => Array(easy.col).fill(false)),
//   statusBoard: Array.from(Array(easy.row), () => Array(easy.col).fill(0)),
//   aroundNumberOfBoard: Array.from(Array(easy.row), () => Array(easy.col).fill(0))
// }

module.exports = {
  row : test.row,
  col : test.col,
  numberOfMine:test.numberOfMine,
  mineBoard: Array.from(Array(test.row), () => Array(test.col).fill(0)),
  visited: Array.from(Array(test.row), () => Array(test.col).fill(false)),
  flagBoard: Array.from(Array(test.row), () => Array(test.col).fill(0)),
  aroundNumberOfBoard: Array.from(Array(test.row), () => Array(test.col).fill(0))
}