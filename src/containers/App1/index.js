import React, { Component }   from 'react'
import theme                  from 'configs/config-theme'
import AppBar                 from 'components/AppBar'
import Home                   from 'containers/Home'
import { appConfig }          from 'configs/config-main'
import { getAdmin, getUserName, getCompanyName }                from '../../configs/user'

const MyContext = React.createContext(false);

// import 'bootstrap/scss/bootstrap.scss';

// global styles for entire app
import './styles.scss'

class App1 extends Component {
  render() {
    const isAdmin = getAdmin(), userName = getUserName(), cname = getCompanyName();

    return (
      // <MuiThemeProvider theme={theme}>
      <MyContext.Provider value={isAdmin}>
        <AppBar isAdmin={isAdmin} name={userName} cname={cname}>{appConfig.name}</AppBar>
        <Home isAdmin={isAdmin}/>
      </MyContext.Provider>
      // </MuiThemeProvider>
    )
  }
}

export default App1
