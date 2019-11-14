import React, {Component} from 'react'
import './calendar.css'
class Calender extends Component{
    render(){
        return (
        <div className="css_body_middle" >
            <a target="_blank" href="https://calendar.google.com/event?action=TEMPLATE&amp;tmeid=N3U3ZTA5YW0ybjBvZjNsaW9ja25scHVqMW4gcmV5dC5hcHBzQG0&amp;tmsrc=reyt.apps%40gmail.com">
                <button className="css_addClient" >Add an Event</button>
                {false?<img border="0" src="https://www.google.com/calendar/images/ext/gc_button1_en.gif"/>:""}  
            </a>
            <br/><br/>
            <iframe className="css_calendar" src="https://calendar.google.com/calendar/embed?src=reyt.apps%40gmail.com&ctz=America%2FToronto"  width="400" height="500" frameborder="0" scrolling="yes"></iframe>
   
        </div>)

    }
}

export default Calender