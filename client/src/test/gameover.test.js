import React from "react";
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import GameBoard from '../components/GameBoard';
import '../styles/index.css';
import App from '../App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../reducers/Index';
import composeWithDevTools from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { BrowserRouter } from 'react-router-dom';
import Game from '../components/Game';

const levelList = {
  Easy: { row: 10, col: 10, numberOfMine: 10 },
  Normal: { row: 16, col: 16, numberOfMine: 40 },
  Hard: { row: 16, col: 30, numberOfMine: 99 },
};

const store = createStore(rootReducer, composeWithDevTools);
const initWrapper = ({ children }) => {
  return (
    < React.StrictMode >
      <BrowserRouter>
        <Provider store={store}>
          {children}
        </Provider>
      </BrowserRouter>
    </React.StrictMode >)
}

describe("Modal", () => {

  it("게임 오버 시 모달이 뜨는가?", async () => {

    const { container } = render(
      initWrapper(
        <App />
      ))

    expect(container).toBeInTheDocument();
    console.log(document.querySelector('.cell'));
    console.log(document.querySelector('cell'));
  });
});
