import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './serviceSummary.css'

import FlpContext from '../../contexts/flpContext'
import DeleteServiceWarning from '../deleteWarning/deleteServiceWarning'
import NumberService from '../../services/numberServices'

import CommentCloud from '../commentCloud/commentCloud'

class serviceSummary extends Component{
    static contextType =FlpContext 
    state = {
        commentOn:false,
        deleteOn : false
    }

    handleComment=()=>{
        const commentOn= !this.state.commentOn
        this.setState({commentOn})
    }


    toggleDelete=()=>{
        const deleteOn = !this.state.deleteOn
        this.setState({deleteOn})
    }
    render(){
        let windowWidth = window.innerWidth
        let width = 4
        if (windowWidth >559){
            width = 6
        }
        let promoName = this.props.promotion_used? this.props.promotion_used :"NA"
        if (this.props.promotion_used){
            let promo = this.context.promotions.filter(promo=>{
                return promo.id === this.props.promotion_used
            })
            promoName = promo[0].name
        }
        
        return (
        <>
        
        {this.state.deleteOn?<tr><td colSpan={width}><DeleteServiceWarning serviceId={parseInt(this.props.id)} toggleDelete={this.toggleDelete} /></td></tr>: <></>}
        <tr> 
            <td> 
                <span><Link to ={`/editService/${parseInt(this.props.id)}`}><button><i className="fa fa-edit"></i></button></Link></span> - 
                {this.props.id} -
                <span><button onClick={this.toggleDelete}><i className="fa fa-trash" aria-hidden="true"></i></button></span>
            </td>
            {this.props.service.more_notes?
                <td>{this.props.notes} ...<i onClick={this.handleComment}   className="far fa-comment-dots css_tooltip"><span className="css_tooltip_text">Click to see more notes</span></i> </td>:
                <td>{this.props.notes}</td>
            }
            
            <td>{ NumberService.dollarFormat(this.props.cost)}</td>
            <td  >{this.props.service_date? this.props.service_date :"NA"}</td>
            <td className="css_small_hide" >{this.props.people}</td>
            <td className="css_small_hide" >{promoName}</td>
            
            
        </tr>
        {this.state.commentOn?<tr ><td  colSpan={width}><CommentCloud title={`${this.props.service.notes}:`} message={this.props.service.more_notes}  /></td></tr>: <></>}
        </>
    )
    }
}

export default serviceSummary