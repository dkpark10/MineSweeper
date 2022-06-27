import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor } from '@testing-library/react';
import createClickFactory from '../utils/mine_sweeper/click_factory';
import CellHandler from '../utils/mine_sweeper/cell_handler';

describe('좌 클릭 테스트', () => {
  const LEFTCLICK = 0;
  const WHEELCLICK = 1;
  const RIGHTCLICK = 2;
  const row = 9;
  const col = 9;
  const mineBoard1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const mineBoard2 = [
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

  test('좌클릭 클리어 테스트', async () => {
    const initCells = Array.from({ length: row }, (v1, y) => (
      Array.from({ length: col }, (v2, x) => ({
        primaryIndex: (y * row) + x,
        mine: mineBoard1[y][x] === 1,
        neighbor: 0,
        visited: false,
        flaged: false,
        visible: ' ',
        isPointerHover: false,
      }))));

    const gameInfo = {
      firstClick: true,
      countOfFlag: 10,
      isGameOver: false,
      gameReset: false,
      gameClearSuccess: false,
      extraCell: (row * col) - 10,
    };

    const clickController = createClickFactory(LEFTCLICK, [...initCells], { y: 1, x: 0 });
    const clickResult = clickController.process(gameInfo);
    expect(clickResult.gameClearSuccess).toBe(true);
  });

  test('휠클릭 클리어 테스트', async () => {
    const origin = Array.from({ length: row }, (v1, y) => (
      Array.from({ length: col }, (v2, x) => ({
        primaryIndex: (y * row) + x,
        mine: mineBoard2[y][x] === 1,
        neighbor: 0,
        visited: false,
        flaged: false,
        visible: ' ',
        isPointerHover: false,
      }))));

    const initCells = new CellHandler({ row, col }, 0, origin).getCellData();

    const gameInfo = {
      firstClick: true,
      countOfFlag: 10,
      isGameOver: false,
      gameReset: false,
      gameClearSuccess: false,
      extraCell: (row * col) - 10,
    };

    initCells[0][0].flaged = true;
    initCells[0][1].flaged = true;
    initCells[0][2].flaged = true;
    initCells[1][0].flaged = true;
    initCells[2][0].flaged = true;
    initCells[2][1].flaged = true;
    initCells[2][2].flaged = true;

    const result1 = createClickFactory(LEFTCLICK, [...initCells], { y: 4, x: 0 });
    const nextGameInfo = result1.process(gameInfo);
    const nextBoard = result1.getCellData();

    expect(nextGameInfo.gameClearSuccess).toBe(false);
    expect(nextGameInfo.extraCell).toBe(2);

    const result2 = createClickFactory(LEFTCLICK, [...nextBoard], { y: 1, x: 1 });
    const nextGameInfo2 = result2.process(nextGameInfo);
    const nextBoard2 = result2.getCellData();

    expect(nextGameInfo2.gameClearSuccess).toBe(false);
    expect(nextGameInfo2.extraCell).toBe(1);

    const result3 = createClickFactory(WHEELCLICK, [...nextBoard2], { y: 1, x: 1 })
      .process(nextGameInfo2);

    expect(result3.gameClearSuccess).toBe(true);
    expect(result3.extraCell).toBe(0);
  });

  test('휠클릭 클리어 실패 테스트', async () => {
    const origin = Array.from({ length: row }, (v1, y) => (
      Array.from({ length: col }, (v2, x) => ({
        primaryIndex: (y * row) + x,
        mine: mineBoard2[y][x] === 1,
        neighbor: 0,
        visited: false,
        flaged: false,
        visible: ' ',
        isPointerHover: false,
      }))));

    const initCells = new CellHandler({ row, col }, 0, origin).getCellData();

    const gameInfo = {
      firstClick: true,
      countOfFlag: 10,
      isGameOver: false,
      gameReset: false,
      gameClearSuccess: false,
      extraCell: (row * col) - 10,
    };

    initCells[0][0].flaged = true;
    initCells[0][1].flaged = true;
    initCells[0][2].flaged = true;
    initCells[1][2].flaged = true;
    initCells[2][0].flaged = true;
    initCells[2][1].flaged = true;
    initCells[2][2].flaged = true;

    const result1 = createClickFactory(LEFTCLICK, [...initCells], { y: 4, x: 0 });
    const nextGameInfo = result1.process(gameInfo);
    const nextBoard = result1.getCellData();

    expect(nextGameInfo.gameClearSuccess).toBe(false);
    expect(nextGameInfo.extraCell).toBe(2);

    const result2 = createClickFactory(LEFTCLICK, [...nextBoard], { y: 1, x: 1 });
    const nextGameInfo2 = result2.process(nextGameInfo);
    const nextBoard2 = result2.getCellData();

    expect(nextGameInfo2.gameClearSuccess).toBe(false);
    expect(nextGameInfo2.extraCell).toBe(1);

    const result3 = createClickFactory(WHEELCLICK, [...nextBoard2], { y: 1, x: 1 })
      .process(nextGameInfo2);

    expect(result3.gameClearSuccess).toBe(false);
    expect(result3.isGameOver).toBe(true);
  });
});
