import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

  test('폭탄 클릭 테스트', async () => {
    global.localStorage.setItem('difficulty', 'easy');
    const { container, getByText } = render(defaultComponent());

    const cells = container.getElementsByClassName('cell');
    await waitFor(() => {
      fireEvent.mouseUp(cells.item(0), { button: 0 });

      // 첫클릭은 폭탄이 아니다
      expect(cells.item(5).textContent).not.toBe('💣');
    });

    for (let i = 1; i < 81; i += 1) {
      fireEvent.mouseUp(cells.item(i), { button: 0 });
      if (cells.item(i).textContent === '💣') {
        break;
      }
    }

    const modal = getByText('실패');
    expect(modal).toBeInTheDocument();
  });

  test('우클릭 테스트', async () => {
    global.localStorage.setItem('difficulty', 'easy');
    const level = global.localStorage.getItem('difficulty');
    const { container, getByText } = render(defaultComponent());

    const cells = container.getElementsByClassName('cell');

    const currentCountOfFlag = getByText(levelList[level].countOfMine);
    const countOfFlag = levelList[level].countOfMine;

    fireEvent.mouseUp(cells.item(20), { button: 2 });
    fireEvent.mouseUp(cells.item(21), { button: 2 });

    expect(currentCountOfFlag.textContent).toBe(`${countOfFlag - 2}`);

    fireEvent.mouseUp(cells.item(20), { button: 2 });
    fireEvent.mouseUp(cells.item(21), { button: 2 });

    expect(currentCountOfFlag.textContent).toBe(`${countOfFlag}`);
  });

  test('타이머 테스트', async () => {
    expect(getCount(4)).toBe('004');
    expect(getCount(53)).toBe('053');
    expect(getCount(834)).toBe('834');
    expect(getCount(43243)).toBe('999');
  });
});
