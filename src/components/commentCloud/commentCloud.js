import React, {Component} from 'react'
import './commentCloud.css'


class CommentCloud extends Component{
    render(){
        return (<div className="css_comment">
                <h4>{this.props.title}</h4>
                <p>{this.props.message}</p>
            </div>)
    }
}

export default CommentCloud;
