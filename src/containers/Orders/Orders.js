import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders:[],
        loading :true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(response =>{
            const fetchOrders = [];

            for(let key in response.data)
            {   
                
                fetchOrders.push({
                    ...response.data[key],
                    id:key
                });
                
            }
            console.log(fetchOrders);
            this.setState({
                loading:false,
                orders:fetchOrders
            });
        })
        .catch(error =>{
            this.setState({loading:false});
        });
    }



    render() {

    let orders = (<Spinner />)

    if(!this.state.loading)
    {
        orders =  this.state.orders.map(order =>{

            return (<Order key={order.id} order={order}/>);
        })
    }


        return (
            <div style={{padding:'20px'}}>
                {orders}
            </div>
        );
    }
}

export default Orders;