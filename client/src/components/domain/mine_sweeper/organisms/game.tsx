import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import styled from 'styled-components';
import {
  Level,
  Coord,
  CellData,
  ClickRenderStatus,
  LevelType,
  WheelClickDown,
  GameInfo,
} from 'mine-sweeper-type';
import Cell from '../atoms/cell';
import GameHeader from '../molecules/game_header';
import ModalWrapper from '../../../common/organisms/modal_wrapper';
import ModalContent from './modal_content';

import createClickFactory from '../../../../utils/mine_sweeper/click_factory';
import CellHandler from '../../../../utils/mine_sweeper/cell_handler';
import ClickHoverHandler from '../../../../utils/mine_sweeper/clickhover_handler';

const MineSweeperWrapper = styled.main`
  background-color: #2e2d2d;
  border-radius: 5px;
  padding:20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  box-shadow:  4px 4px 10px #272626;
`;

const BoardWrapper = styled.div<{ row: number, col: number }>`
  display: grid;
  grid-template-rows: repeat(${({ row }) => row}, 1fr);
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
`;

interface Props {
  level: LevelType;
}

export default function MineSweeper({
  level,
}: Props) {
  const levelList: { [key in LevelType]: Level } = {
    easy: { row: 9, col: 9, countOfMine: 10 },
    normal: { row: 16, col: 16, countOfMine: 40 },
    hard: { row: 16, col: 30, countOfMine: 99 },
  };

  const { row, col, countOfMine } = levelList[level];

  const [cellData, setCellData] = useState<CellData[][]>([]);

  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [countOfFlag, setCountOfFlag] = useState<number>(countOfMine);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [gameReset, setGameReset] = useState<boolean>(false);
  const [gameClearSuccess, setGameClearSuccess] = useState<boolean>(false);

  const [wheelClickDown, setWheelClickDown] = useState<WheelClickDown>({
    isWheelClickDown: false,
    prevHoverY: -1,
    prevHoverX: -1,
  });

  const beginTime = useRef<number>(0);
  const endTime = useRef<number>(0);
  const extraCell = useRef<number>(0);
  enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLICK }

  useEffect(() => {
    setCellData(new CellHandler({ row, col }, countOfMine).getCellData());
    setFirstClick(true);
    setCountOfFlag(countOfMine);
    setGameOver(false);
    setGameClearSuccess(false);
    setWheelClickDown(() => ({
      isWheelClickDown: false,
      prevHoverY: -1,
      prevHoverX: -1,
    }));

    extraCell.current = (row * col) - countOfMine;
  }, [gameReset, row, col, countOfMine]);

  const onFirstClick = (buttonType: number, coord: Coord) => {
    const { y, x } = coord;

    if (firstClick === true && buttonType === CLICKTYPE.LEFTCLICK) {
      setFirstClick(false);
      beginTime.current = new Date().getTime();

      if (cellData[y][x].mine === true) {
        cellData[y][x].mine = false;
        setCellData(new CellHandler({ row, col }, countOfMine).getCellData());
      }
    }
  };

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect의 내부 수행로직은 렌더링이 된 후 수행을 보장한다.
  // 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.
  const onWheelClickDown = ({ y, x }: Coord) => {
    const clickHoverHandler = new ClickHoverHandler(cellData, { y, x });
    const render: ClickRenderStatus = clickHoverHandler
      .removePrevHoverCoord(wheelClickDown)
      .process();
    const newCellData = clickHoverHandler.getCellData();

    if (render.render === false) {
      return;
    }

    setWheelClickDown((prev) => ({
      ...prev,
      prevHoverY: y,
      prevHoverX: x,
    }));
    setCellData(newCellData);
  };

  const onCellClickDown = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {
    if (e.button !== CLICKTYPE.WHEELCLICK) {
      return;
    }

    setWheelClickDown((prev) => ({
      ...prev,
      isWheelClickDown: true,
    }));
    onWheelClickDown({ y, x });
  };

  const onCellMouseOver = ({ y, x }: Coord) => {
    if (wheelClickDown.isWheelClickDown === false) {
      return;
    }
    onWheelClickDown({ y, x });
  };

  const onCellClickUp = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {
    onFirstClick(e.button, { y, x });
    setWheelClickDown((prev) => ({
      ...prev,
      isWheelClickDown: false,
    }));

    const clickController = createClickFactory(e.button, [...cellData], { y, x }, { row, col });
    const clickResult: ClickRenderStatus = clickController
      .removePrevHoverCoord(wheelClickDown)
      .process();
    const newCellData = clickController.getCellData();

    if (clickResult.render === false) {
      return;
    }

    if (e.button === CLICKTYPE.RIGHTCLICK) {
      if (newCellData[y][x].flaged === true) {
        setCountOfFlag(countOfFlag - 1);
      } else {
        setCountOfFlag(countOfFlag + 1);
      }
    }

    // 게임 종료 시
    if (extraCell.current - clickResult.removeCell <= 0) {
      endTime.current = new Date().getTime();
      setGameOver(true);
      if (clickResult.clickBomb === false) {
        setGameClearSuccess(true);
      }
    }

    extraCell.current -= clickResult.removeCell;
    setCellData(newCellData);
  };

  const clickGameReset = useCallback(() => {
    setGameReset((prev) => !prev);
  }, []);

  return (
    <>
      {isGameOver
        && (
          <ModalWrapper>
            <ModalContent
              takenTime={endTime.current - beginTime.current}
              level={level}
              isGameSuccess={gameClearSuccess}
              onMouseClick={clickGameReset}
            />
          </ModalWrapper>
        )}
      <MineSweeperWrapper>
        <GameHeader
          firstClick={firstClick}
          countOfFlag={countOfFlag}
          isGameOver={isGameOver}
          gameReset={clickGameReset}
        />
        <BoardWrapper
          row={row}
          col={col}
        >
          {cellData.map((rowItem, y) => rowItem.map((cell, x) => (
            <Cell
              key={cell.primaryIndex}
              isLock={cell.visited}
              value={cell.mine && isGameOver ? '💣' : cell.visible}
              isPointerHover={cell.isPointerHover}
              onMouseOver={() => onCellMouseOver({ y, x })}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onCellClickDown(e, { y, x })}
              onMouseUp={(e: React.MouseEvent<HTMLDivElement>) => onCellClickUp(e, { y, x })}
              onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
            />
          )))}
        </BoardWrapper>
      </MineSweeperWrapper>
    </>
  );
}
