import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import './editService.css'

//validation services and error boxes
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../../components/errorMessage/errorMessage'

//context
import FlpContext from '../../contexts/flpContext'

class EditService extends Component{
    static contextType= FlpContext
    
    componentDidMount(){
        let {serviceId} = this.props.match.params
        serviceId = parseInt(serviceId)
        const service = this.context.services.find(service=>{
            return service.id=== serviceId
        })
        const notes = service.notes
        const people = service.people
        const cost = service.cost
        const promotion_used = service.promotion_used
        this.setState({
            notes,
            people,
            cost
        })
    }
    state = {
        notes:"Hair And Makeup",
        cost:360,
        people:3,
        error:{
            error_notes:"",
            error_cost:"",
            error_people:""
        },
        error_message:{
            error_message_notes:"",
            error_message_cost:"",
            error_message_people:""
        },
        success:false
    }

    handleNotesChange=(event)=>{
        const notes = event.target.value

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
        if (this.state.error.error_cost||this.state.error.error_notes || this.state.error.error_people ){
            //do nothing there is an error
        }
        else{ 
            const service = {
                notes:this.state.notes,
                cost:this.state.cost,
                people:this.state.people,
                id:parseInt(this.props.match.params.serviceId)
            }
            this.context.editService(service)
            this.setState({
                success:true
            })
        }
    }
    render(){
        if (this.state.success){
            return <Redirect to="/client" />
        }
        return (<>
            <h2 className="css_h2_header" >Edit Service - {this.state.notes}</h2>
            <div className="css_body_middle" >
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Edit Service</legend>
                        {this.state.error.error_notes? <ErrorMessage message={this.state.error_message.error_message_notes} />:"" }
                        <label htmlFor="js_service_notes" >Service Notes</label>
                        <input required onChange={this.handleNotesChange} value={this.state.notes} id="js_service_notes" name="js_service_notes" type="text" />

                        {this.state.error.error_cost? <ErrorMessage message={this.state.error_message.error_message_cost} />:"" }
                        <label htmlFor="js_service_cost" >Total Cost</label>
                        <input required onChange={this.handleCostChange} value={this.state.cost} id="js_service_cost" name="js_service_cost" type="number" min="-100000" max="100000" step="0.01" />
                        <br/>

                        {this.state.error.error_people? <ErrorMessage message={this.state.error_message.error_message_people} />:"" }
                        <label htmlFor="js_service_people" >Number of people serviced</label>
                        <input required onChange={this.handlePeopleChange} value={this.state.people} id="js_service_people" name="js_service_people" type="number" min="0" max="100" step="1" />
                        <br/>


                        <button className="css_button css_add_service_success" type="submit"  >Submit Client</button>
                    </fieldset>
                </form>
            </div>

        </>)
    }
}
export default EditService