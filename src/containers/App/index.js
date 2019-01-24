import React, { Component }   from 'react'
import theme                  from 'configs/config-theme'
import AppBar                 from 'components/AppBar'
import Home                   from 'containers/Home'
import { appConfig }          from 'configs/config-main'
// import 'bootstrap/scss/bootstrap.scss';

// global styles for entire app
import './styles.scss'

class App extends Component {
  render() {
    return (
      // <MuiThemeProvider theme={theme}>
        <div>
          <AppBar>{appConfig.name}</AppBar>
          <Home />
        </div>
      // </MuiThemeProvider>
    )
  }
}

export default App
