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

//services
import AuthService from '../services/authServices'

class App extends Component{
  
  state = {
        ...StartingContext
  }
  fetchCheckToken=(token)=>{
    //check if the current token is good.
    const url = `${config.API_ENDPOINT}/api/login/tokenCheck`
    const auth = {token}
    return fetch(url,{
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify(auth)
    }).then(res=> {return res.json()})
  }
  componentDidMount(){
    const token = window.localStorage.getItem('FLPauthToken')
    if(token){
      this.fetchCheckToken(token).then(res=>{
        if(res.error){
          //fail
          console.log(`Logging out`)
          this.logOut()
        }
        else {
          //success
          this.setState({loggedIn:true})
          this.fetchPromos()
          this.fetchServices()
          this.fetchClients()
        }
      })
    }
    
  }
  fetchLoginTest=()=>{
    const url = `${config.API_ENDPOINT}/api/login`
    const email = "cmR0YW51YnJhdGFAZ21haWwuY29t"
    const password = "dGVzdDE"
    const auth = {email,password}
    fetch(url,{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(auth)
              }).then(res=>res.json()).then(jsonRes=>{
      if (jsonRes.error){
        console.log(jsonRes.error)
      }
      else{
        //console.log(jsonRes.authToken)
        this.logIn(jsonRes.authToken,jsonRes.payload)
      }
    })
  }
  fetchPromos=()=>{
    const url = `${config.API_ENDPOINT}/api/promos/`
    fetch(url).then(res=>res.json()).then(jsonRes=>{
      if (jsonRes.error){
        console.log(jsonRes.error)
      } else {
        this.setState({promotions:[...jsonRes]})
      }
    })
  }
  fetchServices=()=>{
    const url = `${config.API_ENDPOINT}/api/services/`
    fetch(url).then(res=>res.json()).then(jsonRes=>{
      if (jsonRes.error){
        console.log(jsonRes.error)
      } else {
        this.setState({services:[...jsonRes]})
      }
    })
  }
  //No longer USED

  fetchClients=()=>{
    const url = `${config.API_ENDPOINT}/api/clients/`
    fetch(url,{
      headers : new Headers({
        'Authorization': window.localStorage.getItem('FLPauthToken') ? `bearer ${window.localStorage.getItem('FLPauthToken')}`:""
      })
    }).then(res=>res.json()).then(jsonRes=>{
      if (jsonRes.error){
        console.log(jsonRes.error)
      } else {
        this.setState({clients:[...jsonRes]})
      }
      
    })
  }
  
  logIn = (token,payload)=>{
    const loggedIn = true
    AuthService.saveToken(token,payload)
    this.setState({loggedIn})
  }
  logOut = ()=>{
    const loggedIn= false
    AuthService.deleteToken()
    this.setState({loggedIn})
  }


  deleteClient = (clientId)=>{
    const url = `${config.API_ENDPOINT}/api/clients/${clientId}`
    fetch(url,{
      method:`DELETE`
    }).then(res=>{
      this.fetchClients()
    })
  }
  deleteService = (serviceId)=>{
    const url = `${config.API_ENDPOINT}/api/services/${serviceId}`
    fetch(url,{
      method:`DELETE`
    }).then(res=>{
      this.fetchServices()
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
    contextValue.fetchLoginTest = this.fetchLoginTest
    contextValue.fetchPromos=this.fetchPromos
    contextValue.fetchClients = this.fetchClients
    contextValue.fetchServices = this.fetchServices
    contextValue.deleteClient = this.deleteClient
    contextValue.deleteService = this.deleteService
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
          <Route
            component={LandingPage}
          />
        </Switch>   
      </div>
      </FlpContext.Provider>
    )
  }
}

export default App
