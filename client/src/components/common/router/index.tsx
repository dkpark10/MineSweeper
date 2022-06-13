import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface Props extends RouteProps {
  authentication: boolean;
}

export function PrivateRoute({
  authentication,
  ...rest
}: Props) {
  if (authentication) {
    return <Route {...rest} />;
  }
  return <Redirect to='/signin' />;
}
