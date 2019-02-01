import React, { Component }   from 'react'
import theme                  from 'configs/config-theme'
import AppBar                 from 'components/AppBar'
import Home                   from 'containers/Home'
import { appConfig }          from 'configs/config-main'
import { getAdmin, getUserName }                from '../../configs/user'

const MyContext = React.createContext(false);

// import 'bootstrap/scss/bootstrap.scss';

// global styles for entire app
import './styles.scss'

class App extends Component {
  render() {
    const isAdmin = getAdmin(), userName = getUserName();

    return (
      // <MuiThemeProvider theme={theme}>
      <MyContext.Provider value={isAdmin}>
        <AppBar isAdmin={isAdmin} name={userName}>{appConfig.name}</AppBar>
        <Home isAdmin={isAdmin}/>
      </MyContext.Provider>
      // </MuiThemeProvider>
    )
  }
}

export default App
