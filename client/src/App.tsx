import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/app.css';
import useSlientLogin from './components/custom_hooks/useslient_login';
import Loading from './components/common/atoms/loading';
import NotFound from './components/common/page/notfound';

const Home = lazy(() => import('./components/domain/home/page/index'));
const MineSweeper = lazy(() => import('./components/domain/mine_sweeper/page/index'));
const Game2048 = lazy(() => import('./components/domain/2048/page/index'));
const SignIn = lazy(() => import('./components/domain/sign/page/signin'));
const SignUp = lazy(() => import('./components/domain/sign/page/signup'));
const Bulletin = lazy(() => import('./components/domain/bulletin/router/index'));
const MyPage = lazy(() => import('./components/domain/statistics/router/index'));
const Ranking = lazy(() => import('./components/domain/ranking/page/index'));
const Option = lazy(() => import('./components/domain/options/page/index'));
const Test = lazy(() => import('./components/graffiti/mock_component'));

export default function App() {
  useSlientLogin();

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/minesweeper' component={MineSweeper} />
        <Route path='/2048' component={Game2048} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/ranking/:game' component={Ranking} />
        <Route path='/community' component={Bulletin} />
        <Route path='/mypage' component={MyPage} />
        <Route path='/option' component={Option} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
