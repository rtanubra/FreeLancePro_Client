import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import DateServices from '../../services/dateServices'

import DeletePromoWarning from '../../components/deleteWarning/deletePromo'
import FlpContext from '../../contexts/flpContext'
import PromoClientList from '../promoClientList/promoClientList'

class PromoSummary extends Component{
    static contextType = FlpContext
    state = {
        deleteOn : false,
        clients:[],
        clientsList:false
    }
    toggleClientList = ()=>{
        const clientsList = !this.state.clientsList
        this.setState({
            clientsList
        })
    }
    handlePromoDelete=()=>{
        const deleteOn = !this.state.deleteOn
        this.setState({deleteOn})
    }
    componentDidMount(){
        if(this.props.promo.id){
            const clients = this.context.clients.filter(client=>{
                return client.open_promo == this.props.promo.id
            })
            this.setState({
                clients:[...clients]
            })
        }
    }
    render(){
        const startDate = this.props.promo.date_created? DateServices.dbToString(this.props.promo.date_created):""
        const endDate = this.props.promo.date_ending? DateServices.dbToString(this.props.promo.date_ending):""
        
        return (
            <>
                <div className="css_client">
                    <h4>
                        {this.state.deleteOn? <DeletePromoWarning handlePromoDelete={this.handlePromoDelete} id={parseInt(this.props.promo.id)} />:""}
                        <Link to={`/editPromo/${this.props.promo.id}`}>
                        <i className="fa fa-edit"></i></Link>- {this.props.promo.name} - 
                        <span><button onClick={this.handlePromoDelete} >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        </button></span>
                        <p>Description : {this.props.promo.description}</p>
                        <p>Start Date: {startDate} </p>
                        <p>End Date: {endDate} </p>
                        <p>Users with this Promo: {this.state.clients.length}{this.state.clients.length >0?<span> <i onClick={this.toggleClientList} className={`fas ${this.state.clientsList?"fa-angle-double-up":"fa-angle-double-down"}`}></i> </span> :""} </p>
                        {this.state.clientsList?<PromoClientList toggleClientList={this.toggleClientList} clients={this.state.clients} />:""}

                    </h4> 
                </div>
            </>)
    }
}

export default PromoSummary