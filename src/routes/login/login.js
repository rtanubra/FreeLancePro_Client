import React,{Component} from 'react'
import './login.css'
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../../components/errorMessage/errorMessage'
import {Redirect} from 'react-router-dom'
import config from '../../config'

import FlpContext from '../../contexts/flpContext'

class Login extends Component{
    static contextType= FlpContext
    state={
        email:"Enter Email here",
        password:"some password here",
        error_email:false,
        error_email_message:"",
        error_password:false,
        error_password_message:"",
        error_server:false,
        error_server_message:"",
        success:false
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        const url = `${config.API_ENDPOINT}/api/login`
        const email = btoa(this.state.email)
        const password = btoa(this.state.password)
        const auth = {email,password}

        fetch(url,{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(auth)
              }).then(res=>res.json()).then(jsonRes=>{
                  if(jsonRes.error){
                    const error_server = true
                    const error_server_message = jsonRes.error
                    this.setState({
                        error_server,
                        error_server_message
                    })
                  } else{
                    const success=true
                    const error_server = false
                    const error_server_message = ""
                    
                    this.context.logIn(jsonRes.authToken,jsonRes.payload)
                    this.context.fetchServices()
                    this.context.fetchClients()
                    this.context.fetchPromos()
                    this.setState({
                        error_server,
                        error_server_message,
                        success
                    })
                  }
              })
        
    }
    handleEmailChange= (event)=>{
        const email = event.target.value
        const emailCheck = ValidateHelper.emailChek(email)
        let error_email= false
        let error_email_message = ""
        if (!emailCheck[0]){
           error_email= true
           error_email_message = emailCheck[1]
           
        }
        this.setState({error_email,error_email_message,email})    
    }
    handlePasswordChange= (event)=>{
        const password = event.target.value
        this.setState({password})
    }
    
    render(){
        if (this.state.success){
           return <Redirect to={'/client/'}/>
        }
        return (
        <div  className="css_body_middle">
            <form onSubmit={this.handleSubmit} action="/action_page.php" >
                <div className="container">
                <h2>Login Page</h2>
                <p>Welcome back, login to dive right in.</p>
                <hr></hr>
                {this.state.error_server ?<br/>:""}
                {this.state.error_server ? <ErrorMessage message={this.state.error_server_message} />:"" }
                {this.state.error_server ?<br/>:""}
                {this.state.error_email ? <ErrorMessage message={this.state.error_email_message} />:"" }
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" onChange={this.handleEmailChange} value={this.state.email} name="email" required></input>
                <br></br>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" onChange={this.handlePasswordChange} value={this.state.password} name="psw" required></input>
                <br></br>

                <div className="clearfix">

                <button className="css_button" type="submit">Login</button>
                <button type="button" className="css_button css_cancel_button">Cancel</button>
                
                </div>
                </div>
            </form>
        </div>)
    }
}

export default Login