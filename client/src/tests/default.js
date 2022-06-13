import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import theme from '../styles/theme';
import rootReducer from '../reducers/index';
import App from '../app';

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

export default DefaultComponents;
