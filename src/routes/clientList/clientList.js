import React, {Component} from 'react'
import './clientList.css'
import {Link} from 'react-router-dom'

//context
import FlpContext from '../../contexts/flpContext'
import ClientSummary from '../../components/clientSummary/clientSummary'
import FilterList from '../../components/filterList/filterList'

class ClientList extends Component{
    static contextType = FlpContext
    state = {
        searchTerm:""
    }
    handleSearchChange=(event)=>{
        const searchTerm = event.target.value
        this.setState({searchTerm})
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state.searchTerm)
    }
    render(){

        const clientListForUser = this.context.clients.filter(client=>{
            return client.user_id=== 1
        })
        
        let clientListTables ,clientListFilterd
        if (this.state.searchTerm){
            clientListFilterd = clientListForUser.filter(client=>{
                return client.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            }) 
        } else {
            clientListFilterd = [...clientListForUser]
        }
        clientListTables = clientListFilterd.map(client=>{
            return <ClientSummary 
                id={client.id}
                name={client.name} 
                phone={client.phone} 
                email={client.email}
                promo= {client.open_promo}
                key={`${client.id}_client`} />
        })
        
        return (
            <>
            <h2 className="css_h2_header">Welcome Back Finese</h2>
            <Link to={'/addClient'} ><button className="css_button" >Add New Client</button></Link>
            <form className="css_searchForm" onSubmit={this.handleSubmit}> 
                <label className="css_searchLabel" htmlFor="js_searchTerm" >Filter Clients By Name</label>         
                <input className="css_searchInput" onChange={this.handleSearchChange} value={this.state.searchTerm} id="js_searchTerm" name="js_searchTerm" type="text" />
            </form>
            {this.state.searchTerm ? <FilterList visible ={clientListFilterd.length} total={clientListForUser.length} /> :""}
            <div className="css_body_middle" >
                {clientListTables}
            </div>
            </>
        )
    }
}

export default ClientList