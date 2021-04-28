import { difficulty } from './commonutility';

const easy: difficulty = { row: 10, col: 10, numberOfMine: 10 };
const normal: difficulty = { row: 16, col: 16, numberOfMine: 40 };
const hard: difficulty = { row: 16, col: 30, numberOfMine: 99 };
const test: difficulty = { row: 5, col: 5, numberOfMine: 3 };

export { easy, normal, hard, test };