import React, {Component} from 'react';

import {Route, Switch } from 'react-router-dom'

import Header from './header/header'

//routes
import LandingPage from '../routes/landing_page/landing_page'
import Login from '../routes/login/login'
import Register from '../routes/register/register'
import ClientList from '../routes/clientList/clientList'


//contexts
import FlpContext from '../contexts/flpContext'
import StartingContext from '../contexts/startingPoint'

class App extends Component{
  state = {
        ...StartingContext
  }
  
  sayHello = ()=>{
    console.log("Hello I am here")
  }

  render(){
    const contextValue = {
            ...this.state
    }
    contextValue.sayHello = this.sayHello

    return (
      <FlpContext.Provider value={contextValue}>
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
            path={'/register'}
            component={Register}
          />
          <Route
            exact
            path={'/login'}
            component={Login}
          />
          <Route
            exact
            path={'/client'}
            component={ClientList}
          />
        </Switch>   
      </div>
      </FlpContext.Provider>
    )
  }
}

export default App
