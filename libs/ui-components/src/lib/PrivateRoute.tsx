import authService from 'app/services/AuthService';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

type PrivateRouteProps = {
  redirectPath: string;
} & RouteProps;

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ component, redirectPath, ...rest }: any) => {
  const renderComponent = (props: any) =>
    authService.isAuthenticated() ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: redirectPath,
          state: {
            from: rest.path,
          },
        }}
      />
    );

  return <Route {...rest} render={renderComponent} />;
};

export default PrivateRoute;
