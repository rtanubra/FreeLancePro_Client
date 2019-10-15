import React, {Component} from 'react'
import './serviceSummary.css'

import FlpContext from '../../contexts/flpContext'


class serviceSummary extends Component{
    static contextType =FlpContext 
    render(){
        let promoName = this.props.promotion_used? this.props.promotion_used :"NA"
        if (this.props.promotion_used){
            let promo = this.context.promotions.filter(promo=>{
                return promo.id === this.props.promotion_used
            })
            promoName = promo[0].name
        }
        
        return (
        <tr> 
            <td>{this.props.id}</td>
            <td>{this.props.notes}</td>
            <td>{this.props.cost}</td>
            <td>{this.props.people}</td>
            <td>{promoName}</td>
        </tr>
    )
    }
}

export default serviceSummary