import React, {Component} from 'react'
import './landing_page.css'

class LandingPage extends Component{
    render(){
        return(
            <div className="css_landing_page">
                <div className="css_body_middle">
                    <h2 class="css_lp_h2_header">  What is Freelance Pro </h2>
                    <p>
                        Our mission is to create a lightweight and simple to use Client Relationship Manager (CRM) for the Freelancing professional.
                        Use our application if you would like to:
                        <ul>
                            <li>Engage better with your clients</li>
                            <li>Increase client engagement through special promotions</li>
                            <li>Track client services and make notes like a pro</li>
                            <li>Expand your client base through referrals</li>
                        </ul>
                        What you will do in our application
                        <ul>
                            <li>Track Your client services</li>
                            <li>Setup and send client specific promotions</li>
                            <li>Setup and send promotions to all your client base</li>
                        </ul>
                    </p>
                </div>
                <hr></hr>
                <div className="css_body_middle">
                    <h2 class="css_lp_h2_header">  Give us a quick try </h2>
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
                    <button>Login</button>
                </div>
            </div>
        ) 
        
    }
}

export default LandingPage