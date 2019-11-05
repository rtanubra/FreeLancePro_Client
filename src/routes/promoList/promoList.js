import React, {Component} from 'react'
import './promoList.css'
import {Link,Redirect} from 'react-router-dom'

import FlpContext from '../../contexts/flpContext'
import PromoSummary from '../../components/promoSummary/promoSummary'
import FilterList from '../../components/filterList/filterList'

class PromoList extends Component{
    state={
        searchTerm:""
    }
    static contextType= FlpContext
    handleSearchChange=(event)=>{
        const searchTerm = event.target.value
        this.setState({searchTerm})
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state.searchTerm)
    }
    render(){

        const promoList = this.context.promotions? [...this.context.promotions]:[]
        let promoListTables ,promoListFiltered
        if (this.state.searchTerm){
            promoListFiltered = promoList.filter(promo=>{
                return promo.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            }) 
        } else {
            promoListFiltered = [...promoList]
        }
        
        promoListTables = promoListFiltered.map(promo=>{
            return <PromoSummary 
                promo= {promo}
                key={`${promo.id}_promo`} />
        })
        

        return (
            <>
                <h2 className="css_h2_header">Welcome Back Finese</h2>
                <h3 className="css_h2_header" >Promos View</h3>
                <Link to={`/client`}><button className="css_toggle_view">Toggle View</button></Link>
                <div className="css_body_middle" >
                <Link to={'/addPromo'} ><button id="css_addClient" className="css_addClient" >Add New Promo</button></Link>
                <form className="css_searchForm" onSubmit={this.handleSubmit}> 
                    <label className="css_searchLabel" htmlFor="js_searchTerm" >Filter Promos By Name</label>         
                    <input className="css_searchInput" onChange={this.handleSearchChange} value={this.state.searchTerm} id="js_searchTerm" name="js_searchTerm" type="text" />
                </form>
                {this.state.searchTerm ? <FilterList visible ={promoListFiltered.length} total={promoList.length} /> :""}
                </div>
                <div className="css_body_middle" >
                    {promoListTables}
                </div>
            </>)
    }
}

export default PromoList