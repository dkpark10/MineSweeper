import { difficulty } from './commonutility';

const levels : { [key: string]: difficulty } = {
    easy : { row: 10, col: 10, numberOfMine: 10 },
    normal: { row: 16, col: 16, numberOfMine: 40 },
    hard : { row: 16, col: 30, numberOfMine: 99 },
    test : { row: 5, col: 5, numberOfMine: 3 }
};

export { levels };