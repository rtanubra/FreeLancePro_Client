import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './serviceSummary.css'

import FlpContext from '../../contexts/flpContext'
import DeleteServiceWarning from '../deleteWarning/deleteServiceWarning'



class serviceSummary extends Component{
    static contextType =FlpContext 
    state = {
        deleteOn : false
    }
    toggleDelete=()=>{
        const deleteOn = !this.state.deleteOn
        this.setState({deleteOn})
    }
    render(){
        let promoName = this.props.promotion_used? this.props.promotion_used :"NA"
        if (this.props.promotion_used){
            let promo = this.context.promotions.filter(promo=>{
                return promo.id === this.props.promotion_used
            })
            promoName = promo[0].name
        }
        
        return (
        <>
        
        {this.state.deleteOn?<tr><td colSpan={6}><DeleteServiceWarning serviceId={parseInt(this.props.id)} toggleDelete={this.toggleDelete} /></td></tr>: <></>}
        <tr> 
            <td> 
                <span><Link to ={`/editService/${parseInt(this.props.id)}`}><button><i className="fa fa-edit"></i></button></Link></span> - 
                {this.props.id} -
                <span><button onClick={this.toggleDelete}><i className="fa fa-trash" aria-hidden="true"></i></button></span>
            </td>
            <td>{this.props.notes}</td>
            <td>{this.props.cost}</td>
            <td  >{this.props.service_date? this.props.service_date :"NA"}</td>
            <td className="css_small_hide" >{this.props.people}</td>
            <td className="css_small_hide" >{promoName}</td>
            
            
        </tr>
        </>
    )
    }
}

export default serviceSummary