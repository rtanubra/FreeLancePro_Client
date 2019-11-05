import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import DateServices from '../../services/dateServices'

import DeletePromoWarning from '../../components/deleteWarning/deletePromo'

class PromoSummary extends Component{
    state = {
        deleteOn : false
    }
    handlePromoDelete=()=>{
        const deleteOn = !this.state.deleteOn
        this.setState({deleteOn})
    }
    render(){
        const startDate = this.props.promo.date_created? DateServices.dbToString(this.props.promo.date_created):""
        const endDate = this.props.promo.date_ending? DateServices.dbToString(this.props.promo.date_ending):""

        return (
            <>
                <div className="css_client">
                    <h4>
                        {this.state.deleteOn? <DeletePromoWarning handlePromoDelete={this.handlePromoDelete} id={parseInt(this.props.promo.id)} />:""}
                        <Link to={`editPromo/${this.props.promo.id}`}>
                        <i className="fa fa-edit"></i></Link>- {this.props.promo.name} - 
                        <span><button onClick={this.handlePromoDelete} >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        </button></span>
                        <p>Description : {this.props.promo.description}</p>
                        <p>Start Date: {startDate} </p>
                        <p>End Date: {endDate} </p>

                    </h4> 
                </div>
            </>)
    }
}

export default PromoSummary