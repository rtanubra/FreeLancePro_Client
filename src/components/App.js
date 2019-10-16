import React, {Component} from 'react';

import {Route, Switch } from 'react-router-dom'

import Header from './header/header'

//routes
import LandingPage from '../routes/landing_page/landing_page'
import Login from '../routes/login/login'
import Register from '../routes/register/register'
import ClientList from '../routes/clientList/clientList'
import AddClient from '../routes/addClient/addClient'
import AddService from '../routes/addService/addService'

//contexts
import FlpContext from '../contexts/flpContext'
import StartingContext from '../contexts/startingPoint'

class App extends Component{
  state = {
        ...StartingContext
  }
  
  //context functions this could also be created directly in context for cleanliness
  addClient = (client)=>{

    const newId = this.state.clients[this.state.clients.length-1].id+1
    client.id=newId
    client.deleted=false
    const clients = [...this.state.clients]
    clients[newId-1]={...client}
    this.setState({
      clients
    })
  }
  deleteClient = (clientId)=>{
    const clients = [...this.state.clients]
    clients[clientId-1].deleted = true
    this.setState({
      clients
    })
  }
  deleteService = (serviceId)=>{
    const services = [...this.state.services]
    services[serviceId-1].deleted=true
    this.setState({
      services
    })
  }
  addService = (service)=>{
    const newId = this.state.services[this.state.services.length-1].id+1
    service.id=newId
    service.deleted=false
    const services = [...this.state.services]
    services[newId-1] = {...service}
    console.log(services)
    this.setState({
      services
    })
  }


  render(){
    const contextValue = {
            ...this.state
    }
    contextValue.addClient = this.addClient
    contextValue.addService = this.addService
    contextValue.deleteClient = this.deleteClient
    contextValue.deleteService = this.deleteService

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
          <Route
            exact 
            path={'/addService/:clientId'}
            component={AddService}
            />
        </Switch>   
      </div>
      </FlpContext.Provider>
    )
  }
}

export default App
