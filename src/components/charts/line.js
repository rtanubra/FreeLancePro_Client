import React, {Component} from 'react'
import {Line} from 'react-chartjs-2';
import './charts.css'

class LineGraph extends Component{
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
                        'rgba(153,255,204,0.6)'   
                    ]
                }
            ],
            
        }
        return (<>
            <Line 
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

export default LineGraph