import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { Provider } from 'react-redux';
import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './styles/theme';
import rootReducer from './reducers/index';
import App from './App';

const store: Store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
