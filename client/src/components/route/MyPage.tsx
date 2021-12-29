import { RouteComponentProps } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import MyPage from '../page/Mypage';
import Userpage from '../page/Userpage';
import NotFound from '../page/NotFound';

interface MatchParams {
  userid: string;
}

export default function MyPageRouter({ match }: RouteComponentProps<MatchParams>) {

  return (
    <>
      <Switch>
        <Route exact path={`${match.url}`} component={MyPage} />
        <Route exact path={`${match.url}/:userid`} component={Userpage} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}