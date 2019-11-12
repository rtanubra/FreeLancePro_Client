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
        const name = promo? promo.name:"N/A"
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
    emailOut = ()=>{
        const clients = this.state.clientsToAdd.map(client=>{
            return parseInt(client)
        })
        const clientList= []
        let client
        for (let x in clients){
            client = this.context.clients.filter(client=>{
               return client.id === clients[x]  
            })
            client = {...client}
            clientList.push(client)
        }
        const emails = []
        const names = []

        if (clientList.length>0){
            clientList.map(cl=>{
                emails.push(cl[0].email)
                names.push(cl[0].name)
            })
            const myRequest = {
                emails:[...emails],
                names:[...names],
                promo_name:this.props.promo.name,
                promo_description:this.props.promo.description
            }
            const url = `${config.API_ENDPOINT}/api/emails`
            fetch(url,{
                method:"POST",
                headers: new Headers({
                    'content-type':'application/json',
                    "Authorization":window.localStorage.getItem('FLPauthToken') ? `bearer ${window.localStorage.getItem('FLPauthToken')}`:""
                }),
                body: JSON.stringify(myRequest)
            }).then(res=>{
                if(res.error){
                    console.log(res.error)
                }
                this.updateFetch()
            })
            
        }
    }
    updateFetch(){
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
    handleSubmit = (event)=>{
        event.preventDefault()
        this.emailOut()
    }
    render(){
        const promos = [...this.context.promotions]
        const clients = this.context.clients.map(client=>{
            return (
            <tr key={`tr_client_${client.id}`} >
                <td>{client.name}</td>
                <td> <input onClick={this.handleCheck} type="checkbox" name={`${client.id}-give`} value={client.id} /></td>  
                <td className="css_mid_hide" >{this.findPromoName(client.open_promo,promos)}</td>
                <td className="css_small_hide" >{client.id}</td>
                <td className="css_small_hide" >{client.open_promo}</td>
                
                
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
                        <th>Give promo</th>
                        <th className="css_mid_hide" >Current Promo</th>
                        <th className="css_small_hide" >Client id</th>
                        <th className="css_small_hide" >Current Promo Id</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {clients}
                </tbody>
            </table>
            <button className="css_button css_add_client_success" type="submit" >Assign Promo</button>
            
            </form>
            <Link to={`/promoslist/`} ><button className="css_toggle_view" >Back to Promos</button></Link>
        </>
        )
    }
}

export default PromoClientTable