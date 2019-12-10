import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import './editService.css'

//validation services and error boxes

import ErrorMessage from '../../components/errorMessage/errorMessage'
import DateServices from '../../services/dateServices'

//context
import FlpContext from '../../contexts/flpContext'

import config from '../../config'

class EditService extends Component{
    static contextType= FlpContext
    
    componentDidMount(){
        let {serviceId} = this.props.match.params
        serviceId = parseInt(serviceId)
        const service = this.context.services.find(service=>{
            return service.id=== serviceId
        })
        if (service){
            const notes = service.notes
            const people = service.people
            const cost = service.cost
            const date = DateServices.dbToString(service.service_date) 
        this.setState({
            notes,
            people,
            cost,
            date
        })
        }
    }
    state = {
        notes:"Hair And Makeup",
        mainError:false,
        mainError_message:"",
        cost:360,
        people:3,
        date:"",
        error:{
            error_notes:"",
            error_cost:"",
            error_people:"",
            error_date:""
        },
        error_message:{
            error_message_notes:"",
            error_message_cost:"",
            error_message_people:"",
            error_message_date:""
        },
        success:false
    }
    handleDateChange= (event)=>{
        const date = event.target.value
        this.setState({date})
    }
    handleNotesChange=(event)=>{
        const notes = event.target.value
        const mainError = false
        const mainError_message = ""
        let error_notes = false
        let error_cost = this.state.error.error_cost
        let error_people = this.state.error.error_people
        let error_message_notes = ""
        let error_message_cost =this.state.error_message.error_message_cost
        let error_message_people = this.state.error_message.error_message_people
        if (notes){
            if (notes.length===0||notes.length>40){
                error_notes= true
                error_message_notes= "Notes should be up to 40 characters long"
            }

        }else{
            error_notes=true
            error_message_notes = "Notes are required for each service"
        }

        this.setState({
            mainError,
            mainError_message,
            notes,
            error:{
                error_notes,
                error_cost,
                error_people
            },
            error_message:{
                error_message_notes,
                error_message_cost,
                error_message_people
            }
        })
    }
    handlePeopleChange = (event)=>{
        let people = event.target.value
        const mainError = false
        const mainError_message = ""
        let error_notes = this.state.error.error_notes
        let error_cost = this.state.error.error_cost
        let error_people = false
        let error_message_notes = this.state.error_message.error_message_notes
        let error_message_cost =this.state.error_message.error_message_cost
        let error_message_people = ""

        if (people){
            people = parseInt(people)
            if (people <0 || people >= 100){
                error_people = true
                error_message_people="Number of people serviced should be between 1 - 99"
            }
        }
        else {
            error_people= true
            error_message_people="Service requires number of people"
        }
        this.setState({
            mainError,
            mainError_message,
            people,
            error:{
                error_notes,
                error_cost,
                error_people
            },
            error_message:{
                error_message_notes,
                error_message_cost,
                error_message_people
            }
        })
    }
    handleCostChange=(event)=>{
        let cost = event.target.value
        const mainError = false
        const mainError_message = ""
        let error_notes = this.state.error.error_notes
        let error_cost = false
        let error_people = this.state.error.error_people
        let error_message_notes = this.state.error_message.error_message_notes
        let error_message_cost = ""
        let error_message_people = this.state.error_message.error_message_people
        
        if (cost){
            cost = parseFloat(cost)
            if (cost <0 || cost > 100000){
                error_cost= true
                error_message_cost = "Cost amount should be between 0 - 100,000"
            }
        }
        else {
            error_cost= true
            error_message_cost = "Cost is required for each service"
        }
        this.setState({
            mainError,
            mainError_message,
            cost,
            error:{
                error_notes,
                error_cost,
                error_people
            },
            error_message:{
                error_message_notes,
                error_message_cost,
                error_message_people
            }
        })
    }
    handleSubmit= (event)=>{
        event.preventDefault()
        if (this.state.error.error_cost||this.state.error.error_notes || this.state.error.error_people||this.state.error.error_date ){
            //do nothing there is an error
        }
        else{ 
            const service = {
                notes:this.state.notes,
                cost:this.state.cost,
                people:this.state.people,
                service_date:DateServices.stringToDate(this.state.date) ,
                id:parseInt(this.props.match.params.serviceId)
            }

            const url = `${config.API_ENDPOINT}/api/services/${service.id}`
            fetch(url,{
                method:'PATCH',
                headers: new Headers({
                    'content-type':'application/json',
                    "Authorization":window.localStorage.getItem('FLPauthToken') ? `bearer ${window.localStorage.getItem('FLPauthToken')}`:""
                }),
                body:JSON.stringify(service)
            }).then(res=>res.json()).then(jsonRes=>{
                if (jsonRes.error){
                    this.setState({
                        mainError:true,
                        mainError_message:jsonRes.error
                    })
                }
                else{
                    this.context.fetchServices()
                    this.setState({
                        success:true
                    })
                }
            })

        }
    }
    render(){
        if (this.state.success){
            return <Redirect to="/client" />
        }
        if (this.context.loggedIn===false){
            return <Redirect to={''} />
        }
        return (<>
            <h2 className="css_h2_header" >Edit Service - {this.state.notes}</h2>
            <div className="css_body_middle" >
                <form onSubmit={this.handleSubmit}>

                        {this.state.error.error_notes? <ErrorMessage message={this.state.error_message.error_message_notes} />:"" }
                        <label htmlFor="js_service_notes" >Service Notes</label>
                        <input required onChange={this.handleNotesChange} value={this.state.notes} id="js_service_notes" name="js_service_notes" type="text" />
                        <br/>
                        
                        {this.state.error.error_cost? <ErrorMessage message={this.state.error_message.error_message_cost} />:"" }
                        <label htmlFor="js_service_cost" >Total Cost</label>
                        <input required onChange={this.handleCostChange} value={this.state.cost} id="js_service_cost" name="js_service_cost" type="number" min="-100000" max="100000" step="0.01" />
                        <br/>

                        {this.state.error.error_people? <ErrorMessage message={this.state.error_message.error_message_people} />:"" }
                        <label htmlFor="js_service_people" >Number of people serviced</label>
                        <input required onChange={this.handlePeopleChange} value={this.state.people} id="js_service_people" name="js_service_people" type="number" min="0" max="100" step="1" />
                        <br/>

                        {this.state.error.error_date ? <ErrorMessage message={this.state.error_message.error_message_date } />:"" }
                        <label htmlFor="js_service_date" >Service date</label>
                        <input required onChange={this.handleDateChange} value={this.state.date} id="js_service_date" name="js_service_date" type="date"  />
                        <br/>



                        <button className="css_button css_add_service_success" type="submit"  >Save Changes</button>

                </form>
            </div>

        </>)
    }
}
export default EditService