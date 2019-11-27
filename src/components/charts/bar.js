import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2';
import './charts.css'

class BarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
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
        let myWidth = this.state.width > 400 ? 450: 320
        let myHeight = this.state.width > 400 ? 600: 450
        
        if (this.state.width > 550){
            myWidth = 500
            myHeight = 700
        }


        return (<>
            <Bar 
                data={chartData}
                options={{
                    title:{
                        display:true,
                        text:this.props.title?this.props.title:"My Title",
                        fontSize:25
                    },
                    scales:{
                        yAxes:[{
                            ticks:{
                                beginAtZero:false
                            }
                        }]
                    },
                    maintainAspectRatio: false

                }}
            />     
        </>)
    }
}
export default BarGraph
