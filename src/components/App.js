import React, {Component} from 'react';

import {Route, Switch } from 'react-router-dom'

import Header from './header/header'

//routes
import LandingPage from '../routes/landing_page/landing_page'
import Login from '../routes/login/login'
import Register from '../routes/register/register'
import ClientList from '../routes/clientList/clientList'
import AddClient from '../routes/addClient/addClient'

//contexts
import FlpContext from '../contexts/flpContext'
import StartingContext from '../contexts/startingPoint'

class App extends Component{
  state = {
        ...StartingContext
  }
  
  addClient = (client)=>{

    const newId = this.state.clients[this.state.clients.length-1].id+1
    client.id=newId
    const clients = [...this.state.clients]
    clients[newId-1]={...client}
    this.setState({
      clients
    })

  }

  render(){
    const contextValue = {
            ...this.state
    }
    contextValue.addClient = this.addClient

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
          <Route
            exact 
            path={'/addClient'}
            component={AddClient}
            />
        </Switch>   
      </div>
      </FlpContext.Provider>
    )
  }
}

export default App
