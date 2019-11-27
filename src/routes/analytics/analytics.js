import React, {Component} from 'react'

import FlpContext from '../../contexts/flpContext'


import NavBar from '../../components/navBar/navBar'
import BarGraph from '../../components/charts/bar'

import ChartService from '../../services/chartServices'
class Analytics extends Component{
    static contextType = FlpContext

    render(){
        
        const clientNames= this.context.clients.map(client=>{
            return client.name
        })
        const clientAmounts= []
        this.context.services.forEach(service=>{
            if (clientAmounts[service.client_id-1]){
                clientAmounts[service.client_id-1] = clientAmounts[service.client_id-1] + service.cost
            }else {
               clientAmounts[service.client_id-1] = service.cost 
            }
        })

        return (<>
        <h2 className="css_h2_header">Welcome Back Finese</h2>
        <h3 className="css_h2_header" >Analytics View </h3>
        <NavBar active="analytics" />
        <div className="css_body_middle">
            <BarGraph view={"Client Spent ($) View"} labels={clientNames?clientNames:undefined} values={clientAmounts?clientAmounts:undefined} label="Amount $"  title="Amount spent per client ($)" />
        </div>
        </>)
    }
}
export default Analytics