import React,{Component} from 'react'
import './login.css'



class Login extends Component{


    render(){

        return (
        <div  className="css_body_middle">
            <form action="/action_page.php" >
                <div className="container">
                <h2>Login Page</h2>
                <p>Welcome back, login to dive right in.</p>
                <hr></hr>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required></input>
                <br></br>
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required></input>
                <br></br>
                <div className="clearfix">
                <button type="button" className="css_button css_cancel_button">Cancel</button>
                <button className="css_button" type="submit">Login</button>
                </div>
                </div>
            </form>
        </div>)
    }
}

export default Login