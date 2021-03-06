import React, {Component} from  'react'
import {Redirect} from 'react-router-dom'
import './addClient.css'


//validation services and error boxes
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../../components/errorMessage/errorMessage'

//context
import FlpContext from '../../contexts/flpContext'

//config
import config from '../../config'

class AddClient extends Component{
    static contextType= FlpContext
    state = {
        mainError:false,
        mainError_message:"",
        name:"",
        phone:"",
        email:"",
        more_notes:"",
        adress:"",
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
    handleSubmit = (event) =>{
        event.preventDefault()
        const user_id = window.localStorage.getItem('user_id') ? parseInt(window.localStorage.getItem('user_id')) : 1

        if (this.state.error.error_email || this.state.error.error_name || this.state.error.error_phone ){
            //do nothing have errors
        }
        
        else {
            const client = {
                name:this.state.name,
                phone:this.state.phone,
                email:this.state.email,
                more_notes:this.state.more_notes,
                adress:this.state.adress,
                user_id:user_id
            }
            const url = `${config.API_ENDPOINT}/api/clients/`
            fetch(url,{
                method:"POST",
                headers:{
                    'content-type':'application/json',
                    "Authorization":window.localStorage.getItem('FLPauthToken') ? `bearer ${window.localStorage.getItem('FLPauthToken')}`:""
                },
                body:JSON.stringify(client)
            }).then(res=>res.json()).then(jsonRes=>{
                if (jsonRes.error){
                    this.setState({
                        mainError:true,
                        mainError_message:jsonRes.error
                    })
                }
                else {
                    this.context.fetchClients()
                    this.setState({
                        success:true
                    })
                }
            })
        }
        
    }
    handleEmailChange= (event)=>{
        const email = event.target.value
        const mainError = false
        const mainError_message = ""
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
            mainError,
            mainError_message,
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
        const mainError = false
        const mainError_message = ""
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
            mainError,
            mainError_message,
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

    handleNotesChange = (event)=>{
        const more_notes = event.target.value
        this.setState({more_notes})
    }

    handleAdressChange = (event)=>{
        const adress = event.target.value
        this.setState({adress})
    }

    handleNameChange = (event)=>{
        const name= event.target.value;
        const mainError = false
        const mainError_message = ""
        let error_name= false
        let error_phone = this.state.error.error_phone
        let error_email = this.state.error.error_email
        let error_message_name= ""
        let error_message_phone = this.state.error_message.error_message_phone
        let error_message_email = this.state.error_message.error_message_email

        const valid = ValidateHelper.nameCheck(name)
        error_name = !valid[0]
        error_message_name = valid[1]
        this.setState({
            mainError,
            mainError_message,
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
        if (this.state.success){
            return <Redirect to={'/client/'}/>
        }
        if (this.context.loggedIn===false){
            return <Redirect to={''} />
        }
        return (<>
            <h2 className="css_h2_header" >Add a New Client</h2>
            <div className="css_body_middle" >
                <form onSubmit={this.handleSubmit}>

                        {this.state.error.error_name? <ErrorMessage message={this.state.error_message.error_message_name} />:"" }
                        {this.state.mainError ? <ErrorMessage message={this.state.mainError_message} />:"" }
                        <label htmlFor="js_client_name" >Name</label>
                        <input required onChange={this.handleNameChange} placeholder="first last" value={this.state.name} id="js_client_name" name="js_client_name" type="text" />
                        <br/>

                        {this.state.error.error_phone? <ErrorMessage message={this.state.error_message.error_message_phone} />:"" }
                        <label htmlFor="js_client_phone" >Phone</label>
                        <input required type="text" onChange={this.handleNumberChange} placeholder="111-222-3333" name="js_client_phone" id="js_client_phone" value={this.state.phone} />
                        <br/>

                        {this.state.error.error_email? <ErrorMessage message={this.state.error_message.error_message_email} />:"" }
                        <label htmlFor="js_client_email" >Email</label>
                        <input required type="email" onChange={this.handleEmailChange} placeholder="clientEmail@gmail.com" name="js_client_email" id="js_client_email" value={this.state.email} />
                        <br/>

                        <label htmlFor="js_client_more_notes" >Client Notes (Optional)</label>
                        <textarea  onChange={this.handleNotesChange} placeholder="Add client notes here (optional)" name="js_client_more_notes" id="js_client_more_notes" value={this.state.more_notes} />
                        <br/>

                        <label htmlFor="js_client_adress" >Client Adress (Optional)</label>
                        <textarea  onChange={this.handleAdressChange} placeholder="Add client adress here (optional)" name="js_client_adress" id="js_client_adress" value={this.state.adress} />

                        <button className="css_button css_add_client_success" type="submit"  >Submit Client</button>

                </form>
            </div>

        </>)
    }
}

export default AddClient