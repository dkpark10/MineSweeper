const easy = { row: 9, col: 9, numberOfMine: 10 };
const normal = { row: 16, col: 16, numberOfMine: 40 };
const hard = { row: 16, col: 30, numberOfMine: 99 };

module.exports = {
  row : easy.row,
  col : easy.col,
  numberOfMine:easy.numberOfMine,
  mineBoard: Array.from(Array(easy.row), () => Array(easy.col).fill(0)),
  visited: Array.from(Array(easy.row), () => Array(easy.col).fill(false)),
  statusBoard: Array.from(Array(easy.row), () => Array(easy.col).fill(0)),
  aroundNumberOfBoard: Array.from(Array(easy.row), () => Array(easy.col).fill(0))
}