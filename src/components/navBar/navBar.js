import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './navBar.css'
class navBar extends Component{
    render(){
        return (<>
        <div className="css_navBar" >
            {this.props.active !== "clients"?<Link className="css_navAnchor" to ="/client" ><button className="css_navButton clients" ><i className="fas fa-user"></i></button></Link> : ""}
            {this.props.active !== "promos"?<Link className="css_navAnchor" to ="/promoslist" ><button className="css_navButton promos" ><i className="fas fa-gift"></i></button></Link> : ""}
            {this.props.active !== "calendar"?<Link className="css_navAnchor" to ="/calendar" ><button className="css_navButton calendar" ><i className="fas fa-calendar-alt"></i></button></Link> : ""}
            {this.props.active !== "analytics"?<Link className="css_navAnchor" to ="/analytics" ><button className="css_navButton analytics" ><i className="far fa-chart-bar"></i></button></Link> : ""}
        </div>
        </>)
    }
}

export default navBar