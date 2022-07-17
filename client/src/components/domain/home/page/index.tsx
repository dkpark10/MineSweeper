import React from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import Header from '../../../common/organisms/header';
import GameIcon from '../atoms/icongame';
import Content from '../../../common/atoms/content';

const HomeWrapper = styled.main`
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
`;

const GameSelectWrapper = styled.div`
  display:flex;
  justify-content: space-between;
`;

export default function GameHome() {
  const theme = useTheme();
  return (
    <>
      <Header />
      <HomeWrapper>
        <div style={{ textAlign: 'center' }}>
          <Content
            fontSize='2.2rem'
          >
            게임을 선택하세요.
          </Content>
        </div>
        <GameSelectWrapper>
          <Link to='/minesweeper'>
            <GameIcon
              testid='지뢰찾기'
              backgroundColor={theme.mainColor}
            >
              💣
            </GameIcon>
          </Link>
          <Link to='/2048'>
            <GameIcon
              testid='2048'
              backgroundColor={theme.orangeColor}
            >
              2048
            </GameIcon>
          </Link>
        </GameSelectWrapper>
      </HomeWrapper>
    </>
  );
}
