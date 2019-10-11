import React, {Component} from 'react';

import { Route, Switch } from 'react-router-dom'

import Header from './header/header'

//routes
import LandingPage from '../routes/landing_page/landing_page'

class App extends Component{
  render(){
    return (
    <div>
      <Header></Header>
      <Switch>
        <Route
          exact
          path={'/Welcome'}
          component={LandingPage}
        />
      </Switch>
    </div>
    )
  }
}

export default App
