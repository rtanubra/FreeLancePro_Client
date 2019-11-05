import React, {Component} from 'react'

import './deleteWarning.css'

import FlpContext from '../../contexts/flpContext'

class DeleteWarning extends Component{
    static contextType=FlpContext
    render(){
        return (<div className="css_special_delete">
            <h4 className="css_h4_delete">Are you Sure you want to delete?</h4>
            <p className="css_p_delete" >This cannot be undone</p>
            <button onClick={()=>{this.context.deleteClient(this.props.clientId)}} className="css_delete_button css_proceed">Proceed</button>
            <button onClick={this.props.handleClientDelete} className ="css_delete_button css_back" >Nevermind</button>      
        </div>)
    }
}

export default DeleteWarning