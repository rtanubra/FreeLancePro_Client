import React, {Component} from 'react'
import {Doughnut} from 'react-chartjs-2';

class DoughnutGraph extends Component{
    render(){
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
            <Doughnut 
                data={chartData}
                options={{
                    title:{
                        display:true,
                        text:this.props.title?this.props.title:"My Title",
                        fontSize:25
                    },
                }}
            />
        
        </>)
    }
}

export default DoughnutGraph;