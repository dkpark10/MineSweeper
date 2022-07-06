import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  createTile,
  moveTile,
  isGameOver,
  isFullBoard,
} from '../../../../utils/2048/tile_handler';
import {
  calculMoveDistance,
  AnimationTile,
} from '../../../../utils/2048/animation_calcul';
import { NewTileResult } from '../../../../utils/2048/move_tile';

import Tile from '../atoms/tile';
import NewGameButton from '../atoms/newgame_button';
import Score from '../atoms/score';
import Modal from './modal';

const Wrapper2048 = styled.main`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  padding:20px;
  border-radius:6px;
  background-color: #2e2d2d;
  box-shadow: 4px 4px 10px #272626;
`;

const BoardWrapper = styled.div`
  background-color: #2e2d2d;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 6px;
`;

export default function Game2048(): JSX.Element {
  const board = useRef<number[][]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [animationTile, setAnimationTile] = useState<AnimationTile[][]>([]);

  const keyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight'
      && e.key !== 'ArrowUp'
      && e.key !== 'ArrowLeft'
      && e.key !== 'ArrowDown') {
      return;
    }

    const newTileResult: NewTileResult = moveTile(board.current, e.key);
    const moveAnimationTile: AnimationTile[][] = calculMoveDistance({
      prev: board.current,
      next: newTileResult.board,
    }, e.key);

    if (JSON.stringify(newTileResult.board) !== JSON.stringify(board.current)) {
      const newTileData = createTile(newTileResult.board, 1);
      const { y, x, value } = newTileData[0];
      newTileResult.board[y][x] = value;
      moveAnimationTile[y][x].value = value;
      moveAnimationTile[y][x].isNew = true;

      board.current = newTileResult.board;
      setScore((prev) => prev + newTileResult.score);
      setAnimationTile(moveAnimationTile);

      if (isFullBoard(newTileResult.board) && isGameOver(newTileResult.board)) {
        setGameOver(true);
      }
    }
  };

  const initialze = () => {
    const init = Array.from(Array(4), () => Array(4).fill(0));
    const newTileData = createTile(init, 2);
    newTileData.forEach((element) => {
      const { y, x, value } = element;
      init[y][x] = value;
    });

    board.current = init;

    const length = 4;
    const initAnimationTile: AnimationTile[][] = Array.from(
      { length },
      (_1, row) => Array.from({ length }, (_2, col) => ({
        y: 0,
        x: 0,
        value: board.current[row][col],
        isDelete: false,
        isNew: board.current[row][col] > 0,
        primaryIndex: row * 4 + col,
      })),
    );

    setGameOver(false);
    setScore(0);
    setAnimationTile(initAnimationTile);
  };

  useEffect(() => {
    initialze();
  }, []);

  return (
    <>
      <Wrapper2048>
        <Score score={score} />
        <BoardWrapper>
          {animationTile.map((row, rowidx) => row.map((data, colidx) => (
            <Tile
              key={data.primaryIndex}
              data={data}
              newValue={board.current[rowidx][colidx]}
            />
          )))}
        </BoardWrapper>
        <NewGameButton
          onKeyDown={(e: React.KeyboardEvent) => keyDown(e)}
          onReset={initialze}
        />
      </Wrapper2048>
      {
        gameOver && (
          <Modal
            score={score}
            onReset={initialze}
          />
        )
      }
    </>
  );
}
