import React, {Component} from 'react'
import './filterList.css'

class FilterList extends Component{
    render(){
        return (<>
            <div className="css_filterSummary" >
                <p>Showing {this.props.visible} out of {this.props.total} clients</p>
            </div>
        </>)
    }
}
export default FilterList