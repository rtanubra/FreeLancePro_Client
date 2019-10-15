import React, {Component} from 'react'
import './clientList.css'
import {Link} from 'react-router-dom'

//context
import FlpContext from '../../contexts/flpContext'
import ClientSummary from '../../components/clientSummary/clientSummary'

class ClientList extends Component{
    static contextType = FlpContext
    
    render(){
        const clientListTables = this.context.clients.map(client=>{
            return <ClientSummary 
                id={client.id}
                name={client.name} 
                phone={client.phone} 
                email={client.email}
                promo= {client.currentPromo}
                key={`${client.id}_client`} />
        })
        return (
            <>
            <h2 className="css_h2_header">Welcome Back Finese</h2>
            <Link to={'/addClient'} ><button className="css_button" >Add New Client</button></Link>
            <div className="css_body_middle" >
                {clientListTables}
            </div>
            </>
        )
    }
}

export default ClientList