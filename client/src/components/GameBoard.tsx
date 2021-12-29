import React, { useState, useEffect } from 'react';
import { Level, CellData, Coord, ClickRenderStatus } from '../modules/Common';
import '../styles/Game.css';
import * as cellHandler from '../modules/CellHandler';
import GameInfo from './GameInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setExtraCell } from '../reducers/Game';
import { RootState } from '../reducers';
import createClickFactory from '../modules/ClickFactory';
import Cell from './Cell';
import styled from 'styled-components';

const GameBoardWrapper = styled.div<{
  minWidth: string
}>`
  background-color: #2e2d2d;
  border-radius: 5px;
  padding:20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  border:2px solid var(--main-theme-color);
  min-width: ${({ minWidth }) => minWidth};
`;

interface GameBoardProps {
  levelInfo: Level;
  minWidth: string;
}

const GameBoard = ({ levelInfo, minWidth }: GameBoardProps) => {

  const dispatch = useDispatch();
  const LEFTCLICK = 0;

  // 처음 2차원 셀을 생성해주어서 렌더가 안되는 일이 없게 한다.
  const [cellData, setCellData] = useState<CellData[][]>(cellHandler.initializeCell(levelInfo.row, levelInfo.col));
  const [firstClick, setFirstClick] = useState<boolean>(true);
  const [numofFlag, setNumofFlag] = useState<number>(levelInfo.numberOfMine);

  // useSelector는 항상 최상단 함수에 작성한다.
  const { extraCell, gameRestart } = useSelector((state: RootState) => ({
    extraCell: state.game.isGameOver,
    gameRestart: state.game.gameRestart,
  }));

  // useeffect를 사용하여 액션발행을 하고 GameInfo 컴포넌트의 렌더링을 방해하지 않도록 한다.
  // useeffect의 내부 수행로직은 렌더링이 된 후 수행을 보장한다. 
  // 그럼으로 setFlag액션을 발행하면 Board가 렌더링이 되었다는 것을
  // 보장한다. 그 후에 GameInfo를 렌더링한다.

  useEffect(() => {

    const { row, col, numberOfMine } = levelInfo;
    let newCellData: CellData[][] = cellHandler.initializeCell(row, col);

    cellHandler.plantMine(newCellData, numberOfMine);
    cellHandler.getNeighbor(newCellData, { row, col, numberOfMine });

    setCellData(newCellData);
    setNumofFlag(numberOfMine);
    setFirstClick(true);
    dispatch(setExtraCell((row * col) - numberOfMine));

  }, [gameRestart, levelInfo, dispatch]);


  const onCellClick = (e: React.MouseEvent<HTMLDivElement>, { y, x }: Coord) => {

    e.preventDefault();
    // 배열 state를 사용할 때 복사해서 사용하자.
    const newCellData: CellData[][] = [...cellData];

    onFirstClick(firstClick, e.button, newCellData, { y, x });
    const { row, col } = levelInfo;

    let clickController = createClickFactory(e.button, newCellData, { y, x }, { row, col });
    const renderStatus: ClickRenderStatus = clickController.process();

    if (renderStatus.render === true) {
      if (renderStatus.flag === true) {
        clickController.getCellData()[y][x].flaged === true
          ? setNumofFlag(numofFlag => numofFlag - 1)
          : setNumofFlag(numofFlag => numofFlag + 1);
      }

      dispatch(setExtraCell(extraCell - renderStatus.removeCell));
      setCellData(newCellData);
    }
    clickController = null;
  }


  // 첫번째 클릭에 대한 이벤트 처리
  const onFirstClick = (isFirstClick: boolean, buttonType: number, newCellData: CellData[][], coord: Coord) => {

    const { y, x }: Coord = coord;

    if (firstClick === true && buttonType === LEFTCLICK) {
      setFirstClick(false);

      // 첫클릭에 지뢰를 밟지 아니 하도록 한다.
      if (newCellData[y][x].mine === true) {
        newCellData[y][x].mine = false;
        cellHandler.plantMine(newCellData, 1);
        setCellData(newCellData);
      }
    }
  }


  const gameBoard: JSX.Element[] = cellData.map((rowItem, y) => {

    return (
      <div className='game-container-row' key={y}>
        {rowItem.map((data, x) => {
          return (
            <Cell
              key={(y * rowItem.length) + x}
              value={data.mine && extraCell <= 0 ? '💣' : data.visible}
              islock={data.visited}
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => onCellClick(e, { y, x })}
              onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
            />
          )
        })}
      </div>
    )
  })


  return (
    <>
      <GameBoardWrapper
        minWidth={minWidth}
      >
        <GameInfo
          firstClick={firstClick}
          numofFlag={numofFlag}
          isGameOver={extraCell <= 0}
        />
        {gameBoard}
      </GameBoardWrapper>
    </>
  )
}

export default GameBoard;