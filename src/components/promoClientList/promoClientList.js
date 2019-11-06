import React, {Component} from 'react'
import './promoClientList.css'
import {Link} from 'react-router-dom'

class PromoClientList extends Component{
    render(){
        const clientList = this.props.clients.map(client=>{
            return <li key={`promo_${client.name}_${client.id}`} >{client.name} - <Link  to={`/editClient/${client.id}/`}>{client.id}</Link></li>
        })
        return (
        <>
        <ul>
            {clientList}
        </ul>
        </>
        )
    }
}

export default PromoClientList