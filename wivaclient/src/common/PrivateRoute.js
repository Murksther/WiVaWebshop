import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
  
  
const PrivateRoute = ({ component: Component, authenticated, isAdmin, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAdmin ? (
          <Component {...rest} {...props} />
        ) :
        authenticated ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        ) : (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
            />
        )
      }
    />
);
  
export default PrivateRoute