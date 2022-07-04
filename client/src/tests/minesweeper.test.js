import '@testing-library/jest-dom/extend-expect';
import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import defaultComponent, { gameRender } from './default';
import { getCount } from '../utils/common';

describe('메인 게임 테스트', () => {
  const levelList = {
    easy: {
      row: 9, col: 9, countOfMine: 10,
    },
    normal: {
      row: 16, col: 16, countOfMine: 40,
    },
    hard: {
      row: 16, col: 30, countOfMine: 99,
    },
  };

  test('우클릭 테스트', async () => {
    global.localStorage.setItem('difficulty', 'easy');
    const level = global.localStorage.getItem('difficulty');
    const { container, getByText } = render(defaultComponent());

    const cells = container.getElementsByClassName('cell');

    await waitFor(() => {
      fireEvent.mouseUp(cells.item(0), { button: 2 });
      fireEvent.mouseUp(cells.item(1), { button: 2 });
    });

    const countOfFlag = levelList[level].countOfMine - 2;
    const currentCountOfFlag = getByText(countOfFlag);

    expect(currentCountOfFlag.textContent).toBe(`${countOfFlag}`);

    fireEvent.mouseUp(cells.item(0), { button: 2 });
    fireEvent.mouseUp(cells.item(1), { button: 2 });

    expect(currentCountOfFlag.textContent).toBe(`${countOfFlag + 2}`);
  });

  test('게임 성공 테스트', async () => {
    const mineBoard = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const { container, getByText } = render(gameRender(mineBoard));

    const cells = container.getElementsByClassName('cell');
    fireEvent.mouseUp(cells.item(33), { button: 0 });

    const modal = getByText('성공');
    expect(modal).toBeInTheDocument();
  });

  test('첫 클릭이 폭탄 시 게임 오버 되서는 안됨', async () => {
    const mineBoard = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const { container, getByText } = render(gameRender(mineBoard));

    const cells = container.getElementsByClassName('cell');
    fireEvent.mouseUp(cells.item(0), { button: 0 });
    expect(cells.item(0).textContent).not.toBe('💣');

    fireEvent.mouseUp(cells.item(1), { button: 0 });
    const modal = getByText('실패');
    expect(modal).toBeInTheDocument();
  });

  test('휠 클릭으로 게임 성공 하는 테스트', async () => {
    const mineBoard = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const { container, getByText } = render(gameRender(mineBoard));

    const cells = container.getElementsByClassName('cell');
    fireEvent.mouseUp(cells.item(44), { button: 0 });
    fireEvent.mouseUp(cells.item(10), { button: 0 });

    expect(cells.item(10).textContent).toBe('7');

    fireEvent.mouseUp(cells.item(0), { button: 2 });
    fireEvent.mouseUp(cells.item(1), { button: 2 });
    fireEvent.mouseUp(cells.item(2), { button: 2 });
    fireEvent.mouseUp(cells.item(9), { button: 2 });
    fireEvent.mouseUp(cells.item(18), { button: 2 });
    fireEvent.mouseUp(cells.item(19), { button: 2 });
    fireEvent.mouseUp(cells.item(20), { button: 2 });

    fireEvent.mouseUp(cells.item(10), { button: 1 });
    const modal = getByText('성공');
    expect(modal).toBeInTheDocument();
  });

  test('휠 클릭으로 실패 하는 테스트', async () => {
    const mineBoard = [
      [1, 1, 1, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const { container, getByText } = render(gameRender(mineBoard));

    const cells = container.getElementsByClassName('cell');
    fireEvent.mouseUp(cells.item(44), { button: 0 });
    fireEvent.mouseUp(cells.item(10), { button: 0 });

    expect(cells.item(10).textContent).toBe('7');

    fireEvent.mouseUp(cells.item(0), { button: 2 });
    fireEvent.mouseUp(cells.item(1), { button: 2 });
    fireEvent.mouseUp(cells.item(2), { button: 2 });
    fireEvent.mouseUp(cells.item(11), { button: 2 });
    fireEvent.mouseUp(cells.item(18), { button: 2 });
    fireEvent.mouseUp(cells.item(19), { button: 2 });
    fireEvent.mouseUp(cells.item(20), { button: 2 });

    fireEvent.mouseUp(cells.item(10), { button: 1 });
    const modal = getByText('실패');
    expect(modal).toBeInTheDocument();
  });

  test('타이머 테스트', async () => {
    expect(getCount(4)).toBe('004');
    expect(getCount(53)).toBe('053');
    expect(getCount(834)).toBe('834');
    expect(getCount(43243)).toBe('999');
  });
});
