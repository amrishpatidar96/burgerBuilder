import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreaters from '../../store/actions/index';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
       // orders:[],
        loading :true
    }

    componentDidMount(){
      this.props.onFetchOrders(this.props.token);
    }

    render() {

    let orders = (<Spinner />)

    if(!this.props.loading)
    {
        console.log(this.props.orders);
        orders =  this.props.orders.map(order =>{
            console.log(order.ingredients);
            return (<Order key={order.id} 
                order={order.orderData} 
                ingredients ={order.ingredients}
                price={order.price}
                />);
        });
    }


        return (
            <div style={{padding:'20px'}}>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        orders: state.order.orders,
        loading:state.order.loading,
        token:state.auth.token
    }
}


const mapDispatchToProps = (dispatch)=>{
    return {
       onFetchOrders: (token)=>dispatch(actionCreaters.fetchOrders(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));