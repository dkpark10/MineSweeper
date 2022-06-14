import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPage from '../page/user_page';
import PrivateRoute from '../../../common/router/index';
import NotFound from '../../../common/page/notfound';

import { RootState } from '../../../../reducers';

interface MatchParams {
  userid: string;
}

export default function MyPageRouter({ match }: RouteComponentProps<MatchParams>) {
  const { loginedId, isLogin } = useSelector((state: RootState) => ({
    loginedId: state.login.id,
    isLogin: state.login.isLogin,
  }));

  return (
    <Switch>
      <PrivateRoute
        exact
        path={`${match.url}`}
        render={() => <UserPage userid={loginedId} />}
        authentication={isLogin}
      />
      <Route
        path={`${match.url}/:userid`}
        render={() => <UserPage userid={match.params.userid} />}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
