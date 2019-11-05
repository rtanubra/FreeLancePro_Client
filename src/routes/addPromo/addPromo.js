import React, {Component} from  'react'
import './addPromo.css'
import {Redirect} from 'react-router-dom'

//validation services and error boxes
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../../components/errorMessage/errorMessage'
import DateServices from '../../services/dateServices'

//context
import FlpContext from '../../contexts/flpContext'

//config
import config from '../../config'

class AddPromo extends Component{
    static contextType = FlpContext
    state={
        success:false,
        name:"",
        description:"",
        start:"",
        end:"",
        error:{
            error_name:false,
            error_description:false,
            error_start:false,
            error_end:false,
        },
        error_message:{
            error_message_name:"",
            error_message_description:"",
            error_message_start:"",
            error_message_end:"",
        }
    }
    componentDidMount(){
        var start = new Date()
        start = DateServices.convertToformat(start)
        this.setState({start})
    }
    handleSubmit = (event)=>{
        event.preventDefault()
    }
    handleNameChange = (event)=>{
        const name =  event.target.value;

        let error_name= false
        let error_description=this.state.error.error_description
        let error_start=this.state.error.error_start
        let error_end=this.state.error.error_end
        let error_message_name = ""
        let error_message_description = this.state.error_message.error_message_description
        let error_message_start = this.state.error_message.error_message_start
        let error_message_end = this.state.error_message.error_message_end

        const valid = ValidateHelper.promoNameCheck(name)
 
        error_name= !valid[0]
        error_message_name = valid[1]
        

        this.setState({
            name,
            error:{
                error_name:error_name,
                error_description:error_description,
                error_start:error_start,
                error_end:error_end
            },
            error_message:{
                error_message_name:error_message_name,
                error_message_description:error_message_description,
                error_message_start:error_message_start,
                error_message_end:error_message_end
            }
        })
    }
    handleDescriptionChange = (event)=>{
        const description = event.target.value

        let error_name= this.state.error.error_name
        let error_description= false
        let error_start=this.state.error.error_start
        let error_end=this.state.error.error_end
        let error_message_name = this.state.error_message.error_message_name
        let error_message_description = ""
        let error_message_start = this.state.error_message.error_message_start
        let error_message_end = this.state.error_message.error_message_end
        
        const valid = ValidateHelper.promoDescriptionCheck(description)
        error_description = !valid[0]
        error_message_description= valid[1]

        this.setState({
            description,
            error:{
                error_name:error_name,
                error_description:error_description,
                error_start:error_start,
                error_end:error_end
            },
            error_message:{
                error_message_name:error_message_name,
                error_message_description:error_message_description,
                error_message_start:error_message_start,
                error_message_end:error_message_end
            }
        })
    }
    handleStartChange = (event)=>{
        const start = event.target.value
        this.setState({start})
    }
    handleEndChange= (event)=>{
        const end = event.target.value
        this.setState({end})
    }
    render(){
        if (this.state.success){
            return <Redirect to={'/client/'}/>
        }
        console.log(this.state)
        return (
            <>
                <h2 className="css_h2_header" >Add Promo</h2>
                <div className="css_body_middle" >
                    <form onSubmit={this.handleSubmit}>

                        {this.state.error.error_name? <ErrorMessage message={this.state.error_message.error_message_name} />:"" }
                        <label htmlFor="js_promo_name" >Name</label>
                        <input required onChange={this.handleNameChange} 
                        placeholder="percentage-nameYear" value={this.state.name} 
                        id="js_promo_name" name="js_promo_name" type="text" />
                        <br/>

                        {this.state.error.error_description? <ErrorMessage message={this.state.error_message.error_message_description} />:"" }
                        <label htmlFor="js_promo_description" >Description</label>
                        <input required onChange={this.handleDescriptionChange} 
                        placeholder="Give percentage discount to ---- clients" value={this.state.description} 
                        id="js_promo_description" name="js_promo_description" type="text" />
                        <br/>

                        {this.state.error.error_start? <ErrorMessage message={this.state.error_message.error_message_start} />:"" }
                        <label htmlFor="js_promo_start" >Promo Start Date (optional) </label>
                        <input  onChange={this.handleStartChange} 
                        placeholder={this.state.start} value={this.state.start} 
                        id="js_promo_start" name="js_promo_start" type="date" />
                        <br/>

                        {this.state.error.error_end? <ErrorMessage message={this.state.error_message.error_message_end} />:"" }
                        <label htmlFor="js_promo_end" >Promo End Date (optional) </label>
                        <input  onChange={this.handleStartChange} 
                        placeholder={this.state.end} value={this.state.end} 
                        id="js_promo_end" name="js_promo_end" type="date" />
                        <br/>

                        <button className="css_button css_add_client_success" type="submit"  >Add This Promo</button>

                    </form>
                </div>
            </>)
    }
}

export default AddPromo