import React          from 'react'
import ReactDOM       from 'react-dom'
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import configureStore from 'core/store/configureStore'
import App            from './containers/App'
import Login					from './containers/Login'
import { hasRole, isAllowed } from './containers/auth';

import { PrivateRoute } from './containers/PrivateRoute'

// const store = configureStore()

const user = {
  roles: ['admin'],
  rights: ['can_view_articles']
};

const admin = {
  roles: ['user', 'admin'],
  rights: ['can_view_articles', 'can_view_users']
};

ReactDOM.render((
  <BrowserRouter>
     <main>
			<PrivateRoute exact path="/" component={App} />
			{hasRole(admin, ['user']) && <PrivateRoute exact path='/user' component={App} />}
			{hasRole(admin, ['admin']) && <PrivateRoute exact path='/admin' component={App} />}
			<Route path="/login" component={Login} />
			{/* <Route exact path='/' component={App}/> */}
		</main>
  </BrowserRouter>
), document.getElementById('root'))