import React, {Component} from 'react'
import './errorMessage.css'


class ErrorMessage extends Component{
    render(){
        return <p className="css_error_message">{this.props.message}</p>
    }
}

export default ErrorMessage;
