import React from 'react';
import {
  Route,
  Switch,
  useLocation,
  RouteComponentProps
} from 'react-router-dom';

import Bulletin from '../page/bulletin'
import PostPage from '../page/post_page';
import PostCreate from '../page/post_create'
import PostUpdate from '../page/post_update';
import PostDelete from '../page/post_delete';

import { PrivateRoute } from '../../../common/router/index';
import NotFound from '../../../common/page/notfound';

import { RootState } from '../../../../reducers';
import { useSelector } from 'react-redux';
import { PostProps } from 'bulletin-type';

interface LocationProps {
  postInfo: PostProps;
}

export default function BulletinRouter({ match }: RouteComponentProps) {
  const { userid, isLogin } = useSelector((state: RootState) => ({
    userid: state.login.id,
    isLogin: state.login.isLogin
  }));
  const { state } = useLocation<LocationProps>();

  return (
    <Switch>
      <Route exact path={match.url} component={Bulletin} />
      <PrivateRoute
        path={`${match.url}/create`}
        render={(props) => <PostCreate {...props} author={userid} />}
        authentication={isLogin}
      />
      <PrivateRoute
        path={`${match.url}/update/:postid`}
        render={(props: RouteComponentProps<{ postid: string }>) => <PostUpdate {...props} {...state} />}
        authentication={state?.postInfo?.author === userid}
      />
      <PrivateRoute
        path={`${match.url}/delete/:postid`}
        render={(props: RouteComponentProps<{ postid: string }>) => <PostDelete {...props} />}
        authentication={state?.postInfo?.author === userid}
      />
      <Route path={`${match.url}/:postid`} component={PostPage} />
      <Route component={NotFound} />
    </Switch>
  )
}