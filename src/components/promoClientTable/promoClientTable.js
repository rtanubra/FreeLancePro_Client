import React, {Component} from 'react'
import './promoClientTable.css'
import {Link} from 'react-router-dom'
import FlpContext from '../../contexts/flpContext'

class PromoClientTable extends Component{
    static contextType = FlpContext
    state = {
        clientsToAdd:[]
    }
    findPromoName= (promoId,promos)=>{
        const promo = promos.find(promo=>{
            return promo.id === parseInt(promoId)
        })
        const name = promo? promo.name:"Incorrect Id"
        return name
    }
    handleCheck = (event)=>{
        const id = event.target.value
        let clientsToAdd = [...this.state.clientsToAdd]
        if (clientsToAdd.includes(id)){
            clientsToAdd = clientsToAdd.filter(anId=>{
                return anId !==id
            })
        }else {
            clientsToAdd.push(id)
        }
        this.setState({
            clientsToAdd
        })

    }
    handleSubmit = (event)=>{
        event.preventDefault()
        console.log(this.state.clientsToAdd)
    }
    render(){
        const promos = [...this.context.promotions]
        const clients = this.context.clients.map(client=>{
            return (
            <tr key={`tr_client_${client.id}`} >
                <td>{client.name}</td>
                <td>{client.id}</td>
                <td>{this.findPromoName(client.open_promo,promos)}</td>
                <td>{client.open_promo}</td>
                <td> <input onClick={this.handleCheck} type="checkbox" name={`${client.id}-give`} value={client.id} /></td>
                
            </tr>)
        }) 
    
        return (
        <>
            <form onSubmit={this.handleSubmit}>
            <table className="css_pct" >
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Client id</th>
                        <th>Current Promo</th>
                        <th>Current Promo Id</th>
                        <th>Give to Client</th>
                    </tr>
                </thead>
                <tbody>
                    {clients}
                </tbody>
            </table>
            <button className="css_button css_add_client_success" type="submit"  >Give Promos</button>
            </form>
            <Link to={`/promoslist/`} ><button className="css_toggle_view" >Back to Promos</button></Link>
        </>
        )
    }
}

export default PromoClientTable