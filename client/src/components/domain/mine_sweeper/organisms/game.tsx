import React, {
  useEffect, useRef, useState, useCallback, useMemo,
} from 'react';
import styled from 'styled-components';
import {
  Coord,
  CellData,
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
import levelList from '../../../../utils/mine_sweeper/level';
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
  initCells: CellData[][];
}

export default function MineSweeper({
  level,
  initCells,
}: Props) {
  const { row, col, countOfMine } = levelList[level];

  const [cellData, setCellData] = useState<CellData[][]>(initCells);
  const initwheelClickDown: WheelClickDown = useMemo(() => ({
    isWheelClickDown: false,
    prevHoverY: -1,
    prevHoverX: -1,
  }), []);

  const initGameInfo: GameInfo = useMemo(() => ({
    firstClick: true,
    countOfFlag: countOfMine,
    isGameOver: false,
    gameReset: false,
    gameClearSuccess: false,
    extraCell: (row * col) - countOfMine,
  }), [row, col, countOfMine]);

  const [wheelClickDown, setWheelClickDown] = useState<WheelClickDown>(initwheelClickDown);
  const [gameInfo, setGameInfo] = useState<GameInfo>(initGameInfo);

  const beginTime = useRef<number>(0);
  const endTime = useRef<number>(0);
  enum CLICKTYPE { LEFTCLICK = 0, WHEELCLICK, RIGHTCLICK }

  useEffect(() => {
    if (gameInfo.gameReset === true) {
      setCellData(new CellHandler({ row, col }, countOfMine).getCellData());
      setWheelClickDown(initwheelClickDown);
      setGameInfo(initGameInfo);
    }
  }, [gameInfo.gameReset, row, col, countOfMine, initwheelClickDown, initGameInfo]);

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect의 내부 수행로직은 렌더링이 된 후 수행을 보장한다.
  // 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.
  const onWheelClickOver = ({ y, x }: Coord) => {
    const clickHoverHandler = new ClickHoverHandler(cellData, { y, x });
    clickHoverHandler
      .removePrevHoverCoord(wheelClickDown)
      .process(gameInfo);
    const newCellData = clickHoverHandler.getCellData();

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
    onWheelClickOver({ y, x });
  };

  const onCellMouseOver = ({ y, x }: Coord) => {
    if (wheelClickDown.isWheelClickDown === false) {
      return;
    }
    onWheelClickOver({ y, x });
  };

  const onFirstClickMine = (buttonType: number, coord: Coord) => {
    const { y, x } = coord;

    if (gameInfo.firstClick === true && buttonType === CLICKTYPE.LEFTCLICK) {
      beginTime.current = new Date().getTime();

      if (cellData[y][x].mine === true) {
        cellData[y][x].mine = false;
        return new CellHandler({ row, col }, 1, [...cellData]).getCellData();
      }
    }
    return [...cellData];
  };

  const onCellClickUp = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {
    const currentCellData = onFirstClickMine(e.button, { y, x });
    setWheelClickDown((prev) => ({
      ...prev,
      isWheelClickDown: false,
    }));

    const clickController = createClickFactory(e.button, currentCellData, { y, x }, { row, col });
    const clickResult: GameInfo = clickController
      .removePrevHoverCoord(wheelClickDown)
      .process(gameInfo);

    const newCellData = clickController.getCellData();
    if (clickResult.extraCell <= 0) {
      endTime.current = new Date().getTime();
    }

    setGameInfo(() => ({
      ...clickResult,
      isGameOver: clickResult.extraCell <= 0,
    }));

    setCellData(newCellData);
  };

  const clickGameReset = useCallback(() => {
    setGameInfo((prev) => ({
      ...prev,
      gameReset: true,
    }));
  }, []);

  return (
    <>
      {gameInfo.isGameOver
        && (
          <ModalWrapper>
            <ModalContent
              takenTime={endTime.current - beginTime.current}
              level={level}
              isGameSuccess={gameInfo.gameClearSuccess}
              onMouseClick={clickGameReset}
            />
          </ModalWrapper>
        )}
      <MineSweeperWrapper>
        <GameHeader
          firstClick={gameInfo.firstClick}
          countOfFlag={gameInfo.countOfFlag}
          isGameOver={gameInfo.isGameOver}
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
              value={cell.mine && gameInfo.isGameOver ? '💣' : cell.visible}
              // value={cell.mine ? '💣' : cell.visible}
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
