import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import './styles/App.css';
import SignUp from './components/SignUp';
import NotFound from './components/page/NotFound';
import Loading from './components/page/Loading';
import Option from './components/Option';
import NotePad from './Practice/ReduxPrac';
import axios from 'axios';
import { setLogin } from './reducers/Login';
import { useDispatch } from 'react-redux';
import cookieParser from 'cookie-parser';
import cookieKey from './config/CookieKey';
import { ThemeProvider } from 'styled-components';
import theme from './styles/Theme';

// 라우팅 또는 페이지 컴포넌트에서 가져와야 한다.
const Game = lazy(() => import('./components/Game'));
const SignIn = lazy(() => import('./components/SignIn'));
const Bulletin = lazy(() => import('./components/route/Community'));
const MyPage = lazy(() => import('./components/route/MyPage'));
const Ranking = lazy(() => import('./components/Ranking'));

const parseCookie = (name: string) => {

  const cookie = new Cookies();
  const tmp = cookie.get<string>(name);
  const tokenCookie = cookieParser.signedCookie(tmp, cookieKey.key);

  if (!tokenCookie)
    return;

  return JSON.parse(tokenCookie.slice(2));
}

export default function App() {

  const dispatch = useDispatch();
  // Authorization 헤더는 새로고침 브라우저 꺼지면 사라지므로
  // 컴포넌트 새로 마운트 될 때 마다 토큰 박음
  useEffect(() => {

    const parsedCookie = parseCookie('accessToken');

    if (parsedCookie) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsedCookie.accessToken}`;
      dispatch(setLogin({
        isLogin: true,
        id: parsedCookie.id
      }));
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading/>}>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/ranking/:level" component={Ranking} />
            <Route path="/community" component={Bulletin} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/option" component={Option} />
            <Route path="/test" component={NotePad} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </>
  )
}