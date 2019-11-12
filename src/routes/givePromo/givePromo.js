import React,{Component} from 'react'
import FlpContext from '../../contexts/flpContext'
import PromoClientTable from '../../components/promoClientTable/promoClientTable'

class GivePromo extends Component{
    static contextType=FlpContext
    state={
        name:""

    }
    componentWillMount(){
        this.context.fetchClients()
        this.context.fetchPromos()
    }
    componentDidMount(){

    }
    render(){ 
        let {promoId} = this.props.match.params
        const promo = this.context.promotions.find(promo=>{
            return promo.id === parseInt(promoId)
        })
        const clients = this.context.clients.filter(client=>{
            return client.open_promo ===parseInt(promoId)
        })

        
        return(
            <>  
                <h2 className="css_h2_header" >Give Promotion {promo?promo.name:""   } to your clients!</h2>
                <h3 className="css_h2_header" >Promo ID - {promo?promo.id:""}</h3>
                <div className="css_client"> 
                    <PromoClientTable promo={promo?promo:""} promo_id={promo?promo.id:""} />
                </div>
            </>)
    }
}

export default GivePromo