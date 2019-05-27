import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ConnectedRouter } from 'connected-react-router';
import { HashRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux';
import App from './App';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
