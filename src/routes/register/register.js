import React,{Component} from 'react'
import './register.css'

class Register extends Component{
    
    render(){
        return (
        <div  className="css_body_middle">
            <form action="/action_page.php" >
                <div className="container">
                <h2>Register Page</h2>
                <p>Give us a try, register with FreeLance Pro</p>
                <hr></hr>
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required></input>
                <br></br>
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required></input>
                <br></br>
                <label for="rpt_psw"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="rpt_psw" required></input>
                <br></br>
                <div className="clearfix">
                <button type="button" className="css_button css_cancel_button">Cancel</button>
                <button className="css_button" type="submit">Login</button>
                </div>
                </div>
            </form>
        </div>
        )
    }
}

export default Register