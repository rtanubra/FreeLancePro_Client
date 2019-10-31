import React, {Component} from 'react'
import './landing_page.css'
import {Link, Redirect} from 'react-router-dom'

import FlpContext from '../../contexts/flpContext'

class LandingPage extends Component{
    static contextType =FlpContext
    render(){
        if (this.context.loggedIn){
            return <Redirect to={"/client"} />
        }
        return(
            <div className="css_landing_page">
                <div className="css_body_middle">
                    <h2 className="css_lp_h2_header">  What is Freelance Pro </h2>
                    <p>
                        Our mission is to create a lightweight and simple to use Client Relationship Manager (CRM) for the Freelancing professional.
                        Use our application if you would like to:
                    </p>
                        <ul>
                            <li>Engage better with your clients</li>
                            <li>Increase client engagement through special promotions</li>
                            <li>Track client services and make notes like a pro</li>
                            <li>Expand your client base through referrals</li>
                        </ul>
                    <p>
                        What you will do in our application
                    </p>

                        <ul>
                            <li>Track Your client services</li>
                            <li>Create and manage clients</li>
                            <li>Create and manage services</li>
                        </ul>

                </div>
                <hr></hr>
                <div className="css_body_middle">
                    <h2 className="css_lp_h2_header">  Give us a quick try </h2>
                    <p>
                        We've made things simple for you to try Freelance Pro.
                        We've created a test user with a test business for you.
                        Click Login below and you will be logged in as our test user.
                    </p>
                    <p>
                        Once logged in, navigate through the application. Create and edit clients and services as you would in your own business.
                    </p>
                    <hr></hr>
                    <p>Test User Login</p>
                    <Link to={'/client'}><button onClick={()=>{this.context.fetchLoginTest()}} className="css_button">Login</button></Link>
                </div>
            </div>
        ) 
        
    }
}

export default LandingPage