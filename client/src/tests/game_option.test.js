import { render, waitFor } from '@testing-library/react';
import defaultComponent from './default';

describe('타일 길이 테스트', () => {
  test('쉬움 테스트', async () => {
    global.localStorage.setItem('difficulty', 'easy');
    const { container } = render(defaultComponent());

    await waitFor(() => {
      const cells = container.getElementsByClassName('cell');
      expect(cells.length).toBe(9 * 9);
    });
  });

  test('보통 테스트', async () => {
    global.localStorage.setItem('difficulty', 'normal');
    const { container } = render(defaultComponent());

    const cells = container.getElementsByClassName('cell');
    expect(cells.length).toBe(16 * 16);
  });

  test('어려움 테스트', async () => {
    global.localStorage.setItem('difficulty', 'hard');
    const { container } = render(defaultComponent());

    const cells = container.getElementsByClassName('cell');
    expect(cells.length).toBe(16 * 30);
  });

  test('유효하지 않은 키값 테스트', async () => {
    global.localStorage.setItem('difficulty', 'voejsojesojeowqlmdf');
    const { container } = render(defaultComponent());

    const cells = container.getElementsByClassName('cell');
    expect(cells.length).toBe(9 * 9);
  });
});
