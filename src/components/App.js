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
import EditClient from '../routes/editClient/editClient'
import EditService from '../routes/editService/editService'

//contexts
import FlpContext from '../contexts/flpContext'
import StartingContext from '../contexts/startingPoint'

//config
import config from '../config'

class App extends Component{
  
  state = {
        ...StartingContext
  }
  componentDidMount(){
    this.fetchClients()
  }
  fetchClients=()=>{
    const url = `${config.API_ENDPOINT}/api/clients/`
    console.log(url)
    fetch(url).then(res=>res.json()).then(jsonRes=>{
      this.setState({clients:[...jsonRes]})
    })
  }
  logIn = ()=>{
    console.log("logging in")
    const loggedIn = true
    this.setState({loggedIn})
  }
  logOut = ()=>{
    const loggedIn= false
    this.setState({loggedIn})
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
  editClient=(client)=>{
    const clients = [...this.state.clients]
    clients[client.id-1].name = client.name
    clients[client.id-1].email = client.email
    clients[client.id-1].phone = client.phone
    console.log(client)
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
  editService = (service)=>{
    const services = [...this.state.services]
    services[service.id-1].notes =service.notes
    services[service.id-1].cost =service.cost
    services[service.id-1].people =service.people
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
    contextValue.editClient = this.editClient
    contextValue.editService = this.editService
    contextValue.logIn = this.logIn
    contextValue.logOut = this.logOut

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
            path={'/editClient/:clientId'}
            component={EditClient}
            />
          <Route
            exact 
            path={'/addService/:clientId'}
            component={AddService}
            />
          <Route
            exact 
            path={'/editService/:serviceId'}
            component={EditService}
            />
        </Switch>   
      </div>
      </FlpContext.Provider>
    )
  }
}

export default App
