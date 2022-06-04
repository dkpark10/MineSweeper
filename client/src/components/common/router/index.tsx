import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  authentication: boolean;
}

export const PrivateRoute = ({
  authentication,
  ...rest }: Props) => {
  if (authentication) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/signin" />;
  }
};