import React from "react";
import {
  Route,
  Switch,
  useLocation,
  RouteComponentProps
} from "react-router-dom";

import Bulletin from "../page/bulletin"
import PostPage from "../page/post_page";
import PostCreatePage from "../page/post_create_page"
import PostDeletePage from "../page/post_delete_page";

import { PrivateRoute } from "../../../common/router/index";
import NotFound from "../../../common/page/notfound";

import { RootState } from '../../../../reducers';
import { useSelector } from 'react-redux';

interface PostProps {
  postid: string;
  author: string;
}

export default function BulletinRouter({ match }: RouteComponentProps) {
  const { userid, isLogin } = useSelector((state: RootState) => ({
    userid: state.login.id,
    isLogin: state.login.isLogin
  }));
  const { state } = useLocation<PostProps>();

  return (
    <Switch>
      <Route exact path={match.url} component={Bulletin} />
      <PrivateRoute
        path={`${match.url}/create`}
        render={(props) => <PostCreatePage {...props} author={userid} />}
        authentication={isLogin}
      />
      <PrivateRoute
        path={`${match.url}/delete/:postid`}
        render={(props: RouteComponentProps<{ postid: string }>) => <PostDeletePage {...props} />}
        authentication={state && state.author && state.author === userid}
      />
      <Route path={`${match.url}/:postid`} component={PostPage} />
      <Route component={NotFound} />
    </Switch>
  )
}