import React, {Component} from  'react'
import './addClient.css'

import ValidateHelper from '../../services/validator'

class AddClient extends Component{
    state = {
        name:"Example Name",
        phone:"905-323-5555",
        email:"myFakeEmail@gmail.com",
        error:{
            error_name:"",
            error_phone:"",
            error_email:""
        },
        error_message:{
            error_message_name:"",
            error_message_phone:"",
            error_message_email:""
        },
        success:false
    }

    handleEmailChange= (event)=>{
        const email = event.target.value
        let error_name=  this.state.name
        let error_phone = this.state.phone
        let error_email = false
        let error_message_name= this.state.error_message.error_message_name
        let error_message_phone = this.state.error_message.error_message_phone
        let error_message_email = ""

        //need to validate
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
        let error_name=  this.state.name
        let error_phone = false
        let error_email = this.state.email
        let error_message_name= this.state.error_message.error_message_name
        let error_message_phone = ""
        let error_message_email = this.state.error_message.error_message_message

        //need a phone number validator
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
        let error_phone = this.state.phone
        let error_email = this.state.email
        let error_message_name= ""
        let error_message_phone = this.state.error_message.error_message_phone
        let error_message_email = this.state.error_message.error_message_email

        const valid = ValidateHelper.nameCheck(name)
        error_name = valid[0]
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

    render(){
        return (<>
            <h2 className="css_h2_header" >Add a New Client</h2>
            <div className="css_body_middle" >
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Add Client</legend>
                        <label htmlFor="js_client_name" >Name</label>
                        <input required onChange={this.handleNameChange} value={this.state.name} id="js_client_name" name="js_client_name" type="text" />
                        <br/>
                        <label htmlFor="js_client_phone" >Phone</label>
                        <input required type="tel" onChange={this.handleNumberChange} name="js_client_phone" id="js_client_phone" value={this.state.phone} />
                        <br/>
                        <label htmlFor="js_client_email" >Email</label>
                        <input required type="email" onChange={this.handleEmailChange} name="js_client_email" id="js_client_email" value={this.state.email} />
                        <br/>
                    </fieldset>
                </form>
            </div>

        </>)
    }
}

export default AddClient