import React from 'react';
import classes from './Order.module.css';

const order = (props) =>{
    return(
        <div className={classes.Order}  >
            <p>Customer address:{
            props.order.customer.address.street
            +props.order.customer.address.zipcode
            +props.order.customer.address.country

            }</p>
            <p>Customer email:{props.order.customer.email}</p>
            <p>Customer name:{props.order.customer.name}</p>
            <p>Customer deliveryMethod :{props.order.deliveryMethod}</p>

            
            <ul style={{padding:'20px'}}>
                <strong>Ingredients :</strong>
                {Object.keys(props.order.ingredients).map((key)=>{
                   return <li key={key}>{key+' : '+props.order.ingredients[key]}</li>;
                })}
                <li key={"price"}>Price : <strong>USD {Number.parseFloat(props.order.price).toFixed(2)}</strong></li>
            </ul>    
           
           
        </div>
    );
}

export default order; 