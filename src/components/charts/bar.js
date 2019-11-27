import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2';

class BarGraph extends Component {
    
    render(){
        console.log('props')
        console.log(this.props)
        console.log('state')
        console.log(this.state)
        const chartData = {
            labels:this.props.labels,
            datasets:[
                {
                    label:this.props.label,
                    data:this.props.values,
                    backgroundColor:[
                        'rgba(255,99,132,0.6)',
                        'rgba(54,162,235,0.6)',
                        'rgba(255,206,86,0.6)',
                        'rgba(255,204,153,0.6)',
                        'rgba(255,255,153,0.6)',
                        'rgba(204,255,153,0.6)',
                        'rgba(153,255,153,0.6)',
                        'rgba(153,255,204,0.6)'
                        
                    ]
                }
            ],
            
        }
        return (<>
            <h2>{this.props.view?this.props.view:"Client Spent View"}</h2>
            <Bar
                data={chartData}
                options={{
                    title:{
                        display:true,
                        text:this.props.title?this.props.title:"My Title",
                        fontSize:25
                    }
                }}
            />     
        </>)
    }
}
export default BarGraph
