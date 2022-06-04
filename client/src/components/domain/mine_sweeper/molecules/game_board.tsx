import React from "react";
import styled from "styled-components";
import Cell from "../atoms/cell";
import { CellData } from "mine-sweeper-type";

interface Props {
  row: number;
  col: number;
  board: CellData[][];
  isGameOver: boolean;
  onCellClick: React.MouseEventHandler<HTMLDivElement>;
}

const GameBoardWrapper = styled.div<Partial<Props>>`
  background-color: #2e2d2d;
  display: grid;
  grid-template-rows: repeat(${({ row }) => row}, 1fr);
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: 1px;
`;

export default function GameBoard({
  row,
  col,
  board,
  isGameOver,
  onCellClick,
}: Props) {

  return (
    <GameBoardWrapper
      row={row}
      col={col}
    >
      {board.map((rowItem, y) => {
        return (
          <>
            {rowItem.map((data, x) => {
              return (
                <Cell
                  key={(y * rowItem.length) + x}
                  value={data.mine && isGameOver ? "💣" : data.visible}
                  isLock={data.visited}
                  onMouseDown={onCellClick}
                  onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
                />
              )
            })}
          </>
        )
      })}
    </GameBoardWrapper>
  )
}
