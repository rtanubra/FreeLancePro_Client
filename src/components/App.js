import React, {Component} from 'react';

import { Route, Switch } from 'react-router-dom'

import Header from './header/header'

//routes
import LandingPage from '../routes/landing_page/landing_page'
import Login from '../routes/login/login'

class App extends Component{
  render(){
    return (
    <div>
      <Header></Header>
      <Switch>
        <Route
          exact
          path={'/'}
          component={LandingPage}
        />
        <Route
          exact
          path={'/login'}
          component={Login}
        />
      </Switch>
    </div>
    )
  }
}

export default App
