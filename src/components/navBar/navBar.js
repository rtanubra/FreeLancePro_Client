import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './navBar.css'
class navBar extends Component{
    render(){
        return (<div>
        {this.props.active==="clients"? 
        <div className="css_navBar" >
            <Link className="css_navAnchor" to ="/client" ><button disabled className="css_navButton clients_off" >Clients</button></Link>
            <Link className="css_navAnchor" to="/promoslist" ><button className="css_navButton promos"  >Promos</button></Link>
            <Link className="css_navAnchor" to="/calendar" ><button className="css_navButton calendar" >Calendar</button></Link>
        </div>
        :""}

        {this.props.active==="promos"? 
        <div className="css_navBar" >
            <Link className="css_navAnchor" to ="/client" ><button className="css_navButton clients" >Clients</button></Link>
            <Link className="css_navAnchor" to="/promoslist" ><button disabled className="css_navButton promos_off"  >Promos</button></Link>
            <Link className="css_navAnchor" to="/calendar" ><button className="css_navButton calendar" >Calendar</button></Link>
        </div>
        :""}

        {this.props.active==="calendar"? 
        <div className="css_navBar" >
            <Link className="css_navAnchor" to ="/client" ><button className="css_navButton clients" >Clients</button></Link>
            <Link className="css_navAnchor" to ="/promoslist" ><button className="css_navButton promos"  >Promos</button></Link>
            <Link className="css_navAnchor" to ="/calendar" ><button disabled className="css_navButton calendar_off" >Calendar</button></Link>
        </div>
        :""}
        
        </div>)
    }
}

export default navBar