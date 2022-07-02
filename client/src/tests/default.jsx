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
import CellHandler from '../utils/mine_sweeper/cell_handler';
import MineSweeper from '../components/domain/mine_sweeper/page/index';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

function DefaultComponents() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export const gameRender = (mineBoard) => {
  const init = Array.from({ length: 9 }, (v1, y) => (
    Array.from({ length: 9 }, (v2, x) => ({
      primaryIndex: (y * 9) + x,
      mine: mineBoard[y][x] === 1,
      neighbor: 0,
      visited: false,
      flaged: false,
      visible: ' ',
      isPointerHover: false,
    }))));

  const initCells = new CellHandler({ row: 9, col: 9 }, 0, init).getCellData();

  return (
    <Provider store={store}>
      <Game
        level='easy'
        initCells={initCells}
      />
    </Provider>
  );
};

export default DefaultComponents;
