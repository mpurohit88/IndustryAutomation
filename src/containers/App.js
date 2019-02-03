/* eslint-disable import/no-named-as-default */
import { NavLink, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute"
import Login from "./Login"
import App1 from './App1';

import NotFoundPage from "./NotFoundPage";
import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const user = {
  roles: ['admin'],
  rights: ['can_view_articles']
};

const admin = {
  roles: ['user', 'admin'],
  rights: ['can_view_articles', 'can_view_users']
};

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <Switch>
        <main>
          <PrivateRoute exact path="/" component={App1} />
          {/* {hasRole(admin, ['user']) && <PrivateRoute exact path='/user' component={App} />} */}
          {/* {hasRole(admin, ['admin']) && <PrivateRoute exact path='/admin' component={App} />} */}
          <Route path="/login" component={Login} />
          {/* <Route exact path='/' component={Login}/> */}
        </main>

        {/* <Route path="/fuel-savings" component={FuelSavingsPage} />
        <Route path="/about" component={AboutPage} /> */}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);