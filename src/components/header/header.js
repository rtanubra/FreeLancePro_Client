import React, {Component} from 'react';
import './header.css'
import {Link} from 'react-router-dom'
import FlpContext from '../../contexts/flpContext'


class Header extends Component{
    static contextType =FlpContext

    render(){

        if (this.context.loggedIn===true){
            return (
                <div className="css-myHeader">
                    <h1><strong><Link to={''} className="css_header_links" >FreeLance Pro</Link></strong></h1>
                    <div className="css-login">
                        <Link onClick={this.context.logOut}  to={'/'} className="css_header_links css_login_button" id="logout">Logout</Link> 
                    </div>
                <hr></hr>
                </div>
            )
        }else {
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
}

export default Header