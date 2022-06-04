import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import UserPage from "../page/user_page";
import { PrivateRoute } from "../../../common/router/index";
import NotFound from "../../../common/page/notfound";

import { RootState } from '../../../../reducers';
import { useSelector } from 'react-redux';

interface MatchParams {
  userid: string;
}

export default function MyPageRouter({ match }: RouteComponentProps<MatchParams>) {
  const { loginedId, isLogin } = useSelector((state: RootState) => ({
    loginedId: state.login.id,
    isLogin: state.login.isLogin
  }));

  return (
    <>
      <Switch>
        <PrivateRoute
          exact
          path={`${match.url}`}
          render={() => <UserPage userid={loginedId} />}
          authentication={isLogin}
        />
        <Route
          path={`${match.url}/:userid`}
          render={({ match }) => <UserPage userid={match.params.userid} />}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  )
}