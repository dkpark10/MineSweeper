import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  authentication: boolean;
}

export default function PrivateRoute({
  authentication,
  ...rest
}: Props) {
  if (authentication) {
    // eslint-disable-next-line
    return <Route {...rest} />;
  }
  return <Redirect to='/signin' />;
}
