import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './clientSummary.css'


import flpContext from '../../contexts/flpContext'
import SericeSummary from '../serviceSummary/serviceSummary'

import DeleteWarning from '../../components/deleteWarning/deleteWarning'

class ClientSummary extends Component{
    static contextType = flpContext
    state = {
        deleteOn:false
    }
    handleClientDelete= ()=>{
        const deleteOn = !this.state.deleteOn
        this.setState({deleteOn})
    }
    render(){
        let servicesNotDeleted = this.context.services.filter(service=>{
            return service.deleted===false
        })
        let clientServices = servicesNotDeleted.filter(service=>{
            return service.client_id == this.props.id
        })

        let serviceSummaries = clientServices.map(service=>{
            return <SericeSummary
                id={service.id}
                notes ={service.notes}
                people = {service.people}
                promotion_used = {service.promotion_used}
                cost = {service.cost}
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

        return (
            <div className="css_client">
                <h4><i className="fa fa-edit"></i> - {this.props.name} - <span><button onClick={this.handleClientDelete} ><i className="fa fa-trash" aria-hidden="true"></i></button></span></h4> 
                <br></br>
                {this.state.deleteOn? <DeleteWarning handleClientDelete={this.handleClientDelete} clientId={parseInt(this.props.id)} />:""}
                <Link to={`/addService/${this.props.id}`} ><button className="css_button">Add Service</button></Link>
                <p>Email:{this.props.email}</p>
                <p>Phone:{this.props.phone}</p>
                <p>Open Promotions:{promoName}</p>
                
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Notes</th>
                        <th>Cost</th>
                        <th># People</th>
                        <th>Promo</th>
                        <th>Del</th>
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