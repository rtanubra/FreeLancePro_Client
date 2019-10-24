import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './addService.css'

//validation services and error boxes
import ValidateHelper from '../../services/validator'
import ErrorMessage from '../../components/errorMessage/errorMessage'

//context
import FlpContext from '../../contexts/flpContext'

//config
import config from '../../config'

class AddService extends Component{
    static contextType= FlpContext
    state = {
        mainError:false,
        mainError_message:"",
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
        success:false,
        promotion:false,
        promoId:false
    }
    componentDidMount(){
        const client = this.context.clients.find(client=>{
            return client.id === parseInt(this.props.match.params.clientId)
        })
        let promo = ""
        let promotion = false
        let promoId = false
        if (client.open_promo){
            promo  = this.context.promotions.find(promo=>{
                return promo.id ===client.open_promo
            })
            promotion = promo.name
            promoId = promo.id 
        }
        this.setState({
            promotion,
            promoId
        })
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
        if (this.state.error.error_cost||this.state.error.error_notes || this.state.error.error_people ){
            //do nothing there is an error
        }
        else {
            const service = {
                notes:this.state.notes,
                cost:this.state.cost,
                people:this.state.people,
                client_id: parseInt(this.props.match.params.clientId)
            }
            if (this.state.promotion){
                service.promo_id =  this.state.promoId
            }
            // run add here.
            const url = `${config.API_ENDPOINT}/api/services/`
            fetch(url,{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(service)
            }).then(res=>res.json()).then(jsonRes=>{
                if (jsonRes.error){
                    this.setState({
                        mainError : true,
                        mainError_message : jsonRes.error
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
        <h2 className="css_h2_header" >Add a New Service</h2>
            <div className="css_body_middle" >
                <form onSubmit={this.handleSubmit}>

                        {this.state.error.error_notes? <ErrorMessage message={this.state.error_message.error_message_notes} />:"" }
                        {this.state.mainError ? <ErrorMessage message={this.state.mainError_message} />:"" }
                        <label htmlFor="js_service_notes" >Service Notes</label>
                        <br/>
                        <input required onChange={this.handleNotesChange} value={this.state.notes} id="js_service_notes" name="js_service_notes" type="text" />
                        <br/>
                        {this.state.error.error_cost? <ErrorMessage message={this.state.error_message.error_message_cost} />:"" }
                        <label htmlFor="js_service_cost" >Total Cost</label>
                        <br/>
                        <input required onChange={this.handleCostChange} value={this.state.cost} id="js_service_cost" name="js_service_cost" type="number" min="-100000" max="100000" step="0.01" />
                        <br/>

                        {this.state.error.error_people? <ErrorMessage message={this.state.error_message.error_message_people} />:"" }
                        <label htmlFor="js_service_people" >Number of people serviced</label>
                        <br/>
                        <input required onChange={this.handlePeopleChange} value={this.state.people} id="js_service_people" name="js_service_people" type="number" min="0" max="100" step="1" />
                        <br/>

                        {this.state.promotion? <p>{`Client has an open promo! APPLY => ${this.state.promotion}`}</p>:""}


                        <button className="css_button css_add_service_success" type="submit"  >Submit Client</button>

                </form>
            </div>

        </>)
    }
}
export default AddService