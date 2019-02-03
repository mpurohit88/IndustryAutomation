import React          from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore, { history } from './store/configureStore';
import Root from './containers/Root';

// require('./favicon.ico'); // Tell webpack to load favicon.ico
const store = configureStore();

render(  
<AppContainer>
  <Root store={store} history={history} />
</AppContainer>, 
document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}