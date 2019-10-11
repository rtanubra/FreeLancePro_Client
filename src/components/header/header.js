import React, {Component} from 'react';
import './header.css'

class Header extends Component{
    render(){
        return (
        <div className="css-myHeader">
            <h1><strong>FreeLance Pro</strong></h1>
            <div className="css-login">
                <a id="login"></a>Login | <a id="sign-up"></a> Signup
            </div>
        <hr></hr>
        </div>
        )
    }
}

export default Header