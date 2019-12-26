import React, {Component} from 'react'


import './loader.css'

class Loader extends Component{
    render(){
        return (<div className="loaderDiv">
            <span className="loader"><span className="loader-inner"></span></span>
        </div>)
    }
}
export default Loader