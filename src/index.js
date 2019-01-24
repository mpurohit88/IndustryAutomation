import React          from 'react'
import ReactDOM       from 'react-dom'
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import configureStore from 'core/store/configureStore'
import App            from 'containers/App'

// const store = configureStore()

ReactDOM.render((
  <BrowserRouter>
     <main>
      <Switch>
          <Route exact path='/' component={App}/>
      </Switch>
      </main>
  </BrowserRouter>
), document.getElementById('root'))