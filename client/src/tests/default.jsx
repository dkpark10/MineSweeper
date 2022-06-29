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

const initCells = Array.from({ length: 9 }, (v1, y) => (
  Array.from({ length: 9 }, (v2, x) => ({
    primaryIndex: (y * 9) + x,
    mine: y === 0,
    neighbor: 0,
    visited: false,
    flaged: false,
    visible: ' ',
    isPointerHover: false,
  }))));

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

export const gameRender = () => (
  <Game
    level='easy'
    initCells={initCells}
  />
);

export default DefaultComponents;
