import React, {Component} from 'react'

import FlpContext from '../../contexts/flpContext'


import NavBar from '../../components/navBar/navBar'
import BarGraph from '../../components/charts/bar'
import DoughnutGraph from '../../components/charts/doughnut'

import ChartService from '../../services/chartServices'
class Analytics extends Component{
    static contextType = FlpContext

    render(){
        console.log(this.context.services)
        const clientNames= this.context.clients.map(client=>{
            return client.name
        })
        const clientIds = this.context.clients.map(client=>{
            return client.id
        })
        const clientAmounts= []
        this.context.services.forEach(service=>{
            const clientId = service.client_id
            const clientIndex = clientIds.indexOf(clientId)
            if (clientIndex>-1){
                if(clientAmounts[clientIndex] ){
                    clientAmounts[clientIndex] = clientAmounts[clientIndex] + service.cost
                } else {
                    clientAmounts[clientIndex]= service.cost
                }
            }
        })

        return (<>
        <h2 className="css_h2_header">Welcome Back Finese</h2>
        <h3 className="css_h2_header" >Analytics View </h3>
        <NavBar active="analytics" />
        <div className="css_body_middle">
            <h2>Clients Spent view</h2>
            <BarGraph labels={clientNames?clientNames:undefined} values={clientAmounts?clientAmounts:undefined} label="Amount $"  title="Amount spent per client ($) - bar graph" />
            <br/>
            <DoughnutGraph labels={clientNames?clientNames:undefined} values={clientAmounts?clientAmounts:undefined} label="Amount $"   title="Amount spent per client ($) - doughnut"/>
        </div>
        </>)
    }
}
export default Analytics