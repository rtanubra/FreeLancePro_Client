import React, {Component} from 'react'
import './clientSummary.css'

import flpContext from '../../contexts/flpContext'
import SericeSummary from '../serviceSummary/serviceSummary'


class ClientSummary extends Component{
    static contextType = flpContext

    render(){

        let clientServices = this.context.services.filter(service=>{
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

        return (
            <div className="css_client">
                <h4>{this.props.name}</h4><button className="css_button">Add Service</button>
                <p>Email:{this.props.email}</p>
                <p>Phone:{this.props.phone}</p>
                <p>Open Promotions:{this.props.promo}</p>
                <table>
                    <thead>
                    <tr>
                        <th>Service ID</th>
                        <th>Last Service Notes</th>
                        <th>Cost</th>
                        <th>Number of People</th>
                        <th>Promo Used</th>
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