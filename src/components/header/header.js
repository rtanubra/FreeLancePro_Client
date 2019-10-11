import React, {Component} from 'react';
import './header.css'

class Header extends Component{
    render(){
        return (
        <div className="css-myHeader">
            <h1><strong>FreeLance Pro</strong></h1>
            <div className="css-login">
                <button className="css_login_button" id="login">Login</button> | <button className="css_signup_button" id="sign-up">Signup</button> 
            </div>
        <hr></hr>
        </div>
        )
    }
}

export default Header