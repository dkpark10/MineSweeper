import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import theme from '../styles/style_theme';
import rootReducer from '../reducers/index';
import App from '../App';
import Game from '../components/domain/mine_sweeper/organisms/game';
import MineSweeper from '../components/domain/mine_sweeper/page/index';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

function DefaultComponents() {
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

  const level = global.localStorage.getItem('difficulty');
  const initCells = Array.from({ length: levelList[level].row }, (v1, y) => (
    Array.from({ length: levelList[level].col }, (v2, x) => ({
      primaryIndex: (y * levelList[level].row) + x,
      mine: y === 0,
      neighbor: 0,
      visited: false,
      flaged: false,
      visible: ' ',
      isPointerHover: false,
    }))));

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App>
            <MineSweeper>
              <Game
                level={level}
                initCells={initCells}
              />
            </MineSweeper>
          </App>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default DefaultComponents;
