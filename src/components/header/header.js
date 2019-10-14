import React, {Component} from 'react';
import './header.css'
import {Link} from 'react-router-dom'

class Header extends Component{
    render(){
        return (
        <div className="css-myHeader">
            <h1><strong><Link to={''} className="css_header_links" >FreeLance Pro</Link></strong></h1>
            <div className="css-login">
                <Link  to={'/login'} className="css_header_links css_login_button" id="login">Login</Link> | <Link to={'/register'} className="css_header_links css_signup_button" id="sign-up">Signup</Link> 
            </div>
        <hr></hr>
        </div>
        )
    }
}

export default Header