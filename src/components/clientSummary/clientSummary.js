import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import './clientSummary.css'


import FlpContext from '../../contexts/flpContext'
import SericeSummary from '../serviceSummary/serviceSummary'
import DateServices from '../../services/dateServices'
import DeleteWarning from '../../components/deleteWarning/deleteWarning'

class ClientSummary extends Component{
    static contextType = FlpContext
    state = {
        deleteOn:false
    }
    handleClientDelete= ()=>{
        const deleteOn = !this.state.deleteOn
        this.setState({deleteOn})
    }
    render(){

        let clientServices = this.context.services.filter(service=>{
            return service.client_id == this.props.id
        })

        let serviceSummaries = clientServices.map(service=>{
            return <SericeSummary
                service={service}
                id={service.id}
                notes ={service.notes}
                people = {service.people}
                promotion_used = {service.promo_id}
                cost = {service.cost}
                service_date={DateServices.dbToString(service.service_date)}
                key={`${service.id}_service`}
            />
        })

        let promoName = this.props.promo ? this.props.promo:"NA"
        if (this.props.promo){
            let promo = this.context.promotions.filter(promotion=>{
                return promotion.id ===this.props.promo
            })
            promoName = promo[0].name
        }
        if (this.context.loggedIn===false){
            return <Redirect to={''} />
        }

        return (
            <div className="css_client">
                <h4><Link to={`/editClient/${this.props.id}`}><i className="fa fa-edit"></i></Link>- {this.props.name} - <span><button onClick={this.handleClientDelete} ><i className="fa fa-trash" aria-hidden="true"></i></button></span></h4> 
                <br></br>
                {this.state.deleteOn? <DeleteWarning handleClientDelete={this.handleClientDelete} clientId={parseInt(this.props.id)} />:""}
                <Link to={`/addService/${this.props.id}`} ><button className="css_button">Add Service</button></Link>
                <p>Email : {this.props.email}</p>
                <p>Phone : {this.props.phone}</p>
                <p>Open Promotion : {promoName}</p>
                {this.props.client.more_notes? <p>Client Notes: <br/> {this.props.client.more_notes} </p>:""}
                {this.props.client.adress? <p>Client Adress: <br/> {this.props.client.adress} </p>:""}
                
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th><i className="fas fa-book-open"> Notes</i></th>
                        <th><i className="fas fa-dollar-sign"></i></th>
                        <th ><i className="fas fa-calendar-alt"></i></th>
                        <th className="css_small_hide" ><i className='fas fa-users'></i></th>
                        <th className="css_small_hide" ><i className="fas fa-gift"></i> Promo</th>
                        
                    </tr>
                    </thead>
                    <tbody>
                        {serviceSummaries}  
                    </tbody>
                </table>
            </div>
        )
    }
} 

export default ClientSummary