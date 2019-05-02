import React, { Component } from 'react'
import theme from 'configs/config-theme'
import AppBar from 'components/AppBar'
import Home from 'containers/Home'
import { appConfig } from 'configs/config-main'
import { getAdmin, getUserName, getCompanyName, getCompanyLogo } from '../../configs/user'

import Button from '../../components/Button'

const MyContext = React.createContext(false);

// import 'bootstrap/scss/boots trap.scss';

// global styles for entire app
import './styles.scss'

class App1 extends Component {
  render() {
    const isAdmin = getAdmin(), userName = getUserName(), cname = getCompanyName(), clogo = getCompanyLogo();

    return (
      <div>
        <Button className="btn-fixed" variant="info" onClick={() => { window.location.replace('/') }} >Refresh Data</Button>
        <AppBar isAdmin={isAdmin} name={userName} cname={cname} clogo={clogo}>{appConfig.name}</AppBar>
        <Home />
      </div>
    )
  }
}

export default App1
