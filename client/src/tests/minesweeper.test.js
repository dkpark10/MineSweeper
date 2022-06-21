import { render, fireEvent, waitFor } from '@testing-library/react';
import defaultComponent from './default';

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

  test('쉬움 난이도 테스트', async () => {
    global.localStorage.setItem('difficulty', 'easy');
    const level = global.localStorage.getItem('difficulty');

    const { container } = render(defaultComponent());

    await waitFor(() => {
      const cells = container.getElementsByClassName('cell');
      expect(cells.length).toBe(levelList[level].row * levelList[level].col);
    });
  });

  test('보통 길이 테스트', async () => {
    global.localStorage.setItem('difficulty', 'normal');
    const level = global.localStorage.getItem('difficulty');

    const { container } = render(defaultComponent());

    await waitFor(() => {
      const cells = container.getElementsByClassName('cell');
      expect(cells.length).toBe(levelList[level].row * levelList[level].col);
    });
  });

  test('어려움 길이 테스트', async () => {
    global.localStorage.setItem('difficulty', 'hard');
    const level = global.localStorage.getItem('difficulty');

    const { container } = render(defaultComponent());

    await waitFor(() => {
      const cells = container.getElementsByClassName('cell');
      expect(cells.length).toBe(levelList[level].row * levelList[level].col);
    });
  });

  test('첫 클릭 폭탄 테스트', async () => {
    global.localStorage.setItem('difficulty', 'easy');
    const { container } = render(defaultComponent());

    const cells = container.getElementsByClassName('cell');
    fireEvent.mouseUp(cells.item(5), { button: 0 });

    // 첫클릭은 폭탄이 아니다
    expect(cells.item(5).textContent).not.toBe('💣');
    fireEvent.mouseUp(cells.item(4), { button: 0 });
    if (cells.item(4).textContent === '💣') {
      expect(cells.item(4).textContent).toBe('💣');
    }
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
    const getCount = (count) => {
      if (count < 10) {
        return `00${count}`;
      } if (count >= 10 && count < 100) {
        return `0${count}`;
      } if (count >= 100 && count <= 999) {
        return `${count}`;
      }
      return '999';
    };

    expect(getCount(4)).toBe('004');
    expect(getCount(53)).toBe('053');
    expect(getCount(834)).toBe('834');
    expect(getCount(43243)).toBe('999');
  });
});
