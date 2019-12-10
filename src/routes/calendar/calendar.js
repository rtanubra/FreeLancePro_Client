import React, {Component} from 'react'
import './calendar.css'
import NavBar from '../../components/navBar/navBar'

class Calender extends Component{
    render(){
        return (
        <>
            
            <h2 className="css_h2_header">Welcome Back Finese</h2>
            <h3 className="css_h2_header" >Calendar View </h3>
            
            <div className="css_body_middle" >
            <NavBar active="calendar" />
            </div>
            
            <div className="css_body_middle">
            <a target="_blank" href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=N3U3ZTA5YW0ybjBvZjNsaW9ja25scHVqMW4gcmV5dC5hcHBzQG0&amp;tmsrc=reyt.apps%40gmail.com">
                <button className="css_addClient" >Add an Event</button>
                {false?<img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"/>:""}  
            </a>
            <br/><br/>
            <iframe src="https://calendar.google.com/calendar/embed?height=500&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FToronto&amp;src=cmV5dC5hcHBzQGdtYWlsLmNvbQ&amp;src=ZW4uY2FuYWRpYW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%2322AA99&amp;color=%231F753C&amp;showNav=0&amp;showDate=0&amp;showTitle=1&amp;showPrint=0&amp;showTabs=1&amp;showCalendars=0&amp;mode=WEEK" 
                width="550" 
                height="500" 
                frameBorder="0"
                scrolling="no">
             </iframe>
             </div>
   
        </>)

    }
}

export default Calender