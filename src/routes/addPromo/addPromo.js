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
        mainError:false,
        mainErrorMessage:"",
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
        start = DateServices.dateToString(start)
        this.setState({start})
    }
    handleSubmit = (event)=>{
        event.preventDefault()
        if(this.state.error.error_description ||this.state.error.error_end || this.state.error.error_name ||this.state.error.error_start ){
            //do nothing because there is an error
        }
        else {
            const url = `${config.API_ENDPOINT}/api/promos/`
            const promo = {
                name:this.state.name,
                description:this.state.description,
            }
            if (this.state.start){
                promo.date_created = DateServices.stringToDate(this.state.start)
            }
            if (this.state.end){
                promo.date_ending = DateServices.stringToDate(this.state.end)
            }
            
            fetch(url,{
                method:"POST",
                headers: new Headers({
                    'content-type':'application/json',
                    "Authorization":window.localStorage.getItem('FLPauthToken') ? `bearer ${window.localStorage.getItem('FLPauthToken')}`:""
                }),
                body: JSON.stringify(promo)
            }).then(res=>res.json()).then(jsonRes=>{
                //response is here
                console.log(jsonRes)
                if (jsonRes.error){
                    const mainError = true
                    const mainErrorMessage = jsonRes.error
                    this.setState({
                        mainError,mainErrorMessage
                    })
                }else {
                    this.context.fetchPromos()
                    this.setState({
                        success:true
                    })
                }
            })
            
        }
    }
    handleNameChange = (event)=>{
        const name =  event.target.value;
        let mainError=false 
        let mainErrorMessage= ""
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
            name,mainError, mainErrorMessage,
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

        let mainError=false 
        let mainErrorMessage= ""
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
            description,mainError,mainErrorMessage,
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
        
        let mainError=false 
        let mainErrorMessage= ""
        let error_name= this.state.error.error_name
        let error_description= this.state.error.error_description
        let error_start=this.state.error.error_start
        let error_end= false 
        let error_message_name = this.state.error_message.error_message_name
        let error_message_description = this.state.error_message.error_message_description
        let error_message_start = this.state.error_message.error_message_start
        let error_message_end = ""

        //cannot be before start
        const startDate =DateServices.stringToDate(this.state.start)
        const endDate = DateServices.stringToDate(end)

        if (startDate>=endDate){
            error_end = true
            error_message_end = "End date or promotion must be after start date (You can leave it blank to make it last for over a year)"
        }
        this.setState({
            end,mainError,mainErrorMessage,
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
    render(){
        if (this.state.success){
            return <Redirect to={'/promosList/'}/>
        }

        return (
            <>
                <h2 className="css_h2_header" >Add Promo</h2>
                <div className="css_body_middle" >
                    <form onSubmit={this.handleSubmit}>

                        {this.state.mainError ? <ErrorMessage message={this.state.mainErrorMessage} />:"" }
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
                        <label htmlFor="js_promo_start" >Promo Start Date </label>
                        <input  onChange={this.handleStartChange} 
                        placeholder={this.state.start} value={this.state.start} 
                        id="js_promo_start" name="js_promo_start" type="date" />
                        <br/>

                        {this.state.error.error_end? <ErrorMessage message={this.state.error_message.error_message_end} />:"" }
                        <label htmlFor="js_promo_end" >Promo End Date (optional) </label>
                        <input  onChange={this.handleEndChange} 
                        placeholder={this.state.end} value={this.state.end} 
                        id="js_promo_end" name="js_promo_end" type="date" />
                        <br/>

                        <button className="css_button css_add_client_success" type="submit"  >Submit Promo</button>

                    </form>
                </div>
            </>)
    }
}

export default AddPromo