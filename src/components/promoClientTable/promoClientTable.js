import React, {Component} from 'react'
import './promoClientTable.css'
import {Link,Redirect} from 'react-router-dom'
import FlpContext from '../../contexts/flpContext'

import config from '../../config'

class PromoClientTable extends Component{
    static contextType = FlpContext
    state = {
        clientsToAdd:[],
        success:false
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
        const clients = this.state.clientsToAdd.map(client=>{
            return parseInt(client)
        })
        const massUpdate = {
            promo_id:parseInt(this.props.promo_id),
            clients
        }
        const url = `${config.API_ENDPOINT}/api/promos/`
        fetch(url,{
            method:"PATCH",
            headers: new Headers({
                'content-type':'application/json',
                "Authorization":window.localStorage.getItem('FLPauthToken') ? `bearer ${window.localStorage.getItem('FLPauthToken')}`:""
            }),
            body: JSON.stringify(massUpdate)
        }).then(res=>{
            this.context.fetchClients()
            this.context.fetchPromos()
            this.setState({success:true})
        })
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
        if (this.state.success){
            return <Redirect to={'/client'}/>
        }
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