import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './editClient.css'

//validation services and error boxes
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../../components/errorMessage/errorMessage'

import FlpContext from '../../contexts/flpContext'

class EditClient extends Component{
    static contextType= FlpContext
    componentDidMount(){
        let {clientId} = this.props.match.params
        clientId = parseInt(clientId)
        const clients = this.context.clients.filter(client=>{
            return client.id === clientId
        })
        
        const client = clients[0]
        const name = client.name
        const phone = client.phone
        const email = client.email
        this.setState({
            name,phone,email
        })
        
    }
    handleSubmit = (event) =>{
        
        event.preventDefault()
        if (this.state.error.error_email || this.state.error.error_name || this.state.error.error_phone ){
            //do nothing have errors
            console.log('here-errors')
            console.log(this.state.error.error_email, this.state.error.error_name, this.state.error.error_phone)
        }
        else {
            console.log('here')
            const client = {
                name:this.state.name,
                phone:this.state.phone,
                email:this.state.email,
                id: parseInt(this.props.match.params.clientId)
            }
            this.context.editClient(client)
            this.setState({
            success:true
        })
        }
        
        
    }
    handleEmailChange= (event)=>{
        const email = event.target.value
        let error_name=  this.state.error.error_name
        let error_phone = this.state.error.error_phone
        let error_email = false
        let error_message_name= this.state.error_message.error_message_name
        let error_message_phone = this.state.error_message.error_message_phone
        let error_message_email = ""

        //need to validate
        let valid = ValidateHelper.emailChek(email)
        error_email = !valid[0]
        error_message_email = valid[1]
        this.setState({
            email,
            error:{
                error_name:error_name,
                error_phone:error_phone,
                error_email:error_email
            },
            error_message:{
                error_message_name:error_message_name,
                error_message_phone:error_message_phone,
                error_message_email:error_message_email
            }
        })
    }
    handleNumberChange= (event)=>{
        const phone = event.target.value
        let error_name=  this.state.error.error_name
        let error_phone = false
        let error_email = this.state.error.error_email
        let error_message_name= this.state.error_message.error_message_name
        let error_message_phone = ""
        let error_message_email = this.state.error_message.error_message_message

        //need a phone number validator
        const valid = ValidateHelper.phoneCheck(phone)
        error_phone= !valid[0]
        error_message_phone = valid[1]
        
        this.setState({
            phone,
            error:{
                error_name:error_name,
                error_phone:error_phone,
                error_email:error_email
            },
            error_message:{
                error_message_name:error_message_name,
                error_message_phone:error_message_phone,
                error_message_email:error_message_email
            }
        })
    }
    handleNameChange = (event)=>{
        const name= event.target.value;
        let error_name= false
        let error_phone = this.state.error.phone
        let error_email = this.state.error.email
        let error_message_name= ""
        let error_message_phone = this.state.error_message.error_message_phone
        let error_message_email = this.state.error_message.error_message_email

        const valid = ValidateHelper.nameCheck(name)
        error_name = !valid[0]
        error_message_name = valid[1]
        this.setState({
            name,
            error:{
                error_name:error_name,
                error_phone:error_phone,
                error_email:error_email
            },
            error_message:{
                error_message_name:error_message_name,
                error_message_phone:error_message_phone,
                error_message_email:error_message_email
            }
        })
    }
    state = {
        name:"Example Name",
        phone:"905-323-5555",
        email:"myFakeEmail@gmail.com",
        error:{
            error_name:false,
            error_phone:false,
            error_email:false
        },
        error_message:{
            error_message_name:"",
            error_message_phone:"",
            error_message_email:""
        },
        success:false
    }
    render(){
        if (this.state.success){
            return <Redirect to={'/client'}/>
        }
        return (<>
            <h2 className="css_h2_header" >Edit Client {this.state.name}</h2>
                <div className="css_body_middle" >
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Edit</legend>
                            {this.state.error.error_name? <ErrorMessage message={this.state.error_message.error_message_name} />:"" }
                            <label htmlFor="js_client_name" >Name</label>
                            <input required onChange={this.handleNameChange} value={this.state.name} id="js_client_name" name="js_client_name" type="text" />
                            <br/>
                            {this.state.error.error_phone? <ErrorMessage message={this.state.error_message.error_message_phone} />:"" }
                            <label htmlFor="js_client_phone" >Phone</label>
                            <input required type="text" onChange={this.handleNumberChange} name="js_client_phone" id="js_client_phone" value={this.state.phone} />
                            <br/>
                            {this.state.error.error_email? <ErrorMessage message={this.state.error_message.error_message_email} />:"" }
                            <label htmlFor="js_client_email" >Email</label>
                            <input required type="email" onChange={this.handleEmailChange} name="js_client_email" id="js_client_email" value={this.state.email} />
                            <br/>
                            <button className="css_button css_add_client_success" type="submit"  >Submit Changes</button>
                        </fieldset>
                    </form>
                </div>
        </>)
    }
}

export default EditClient