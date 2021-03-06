import React from 'react';
import classes from './Order.module.css';

const order = (props) =>{
    return(
        <div className={classes.Order}  >
            <p>Customer address:{
            props.order.street
            +props.order.zipcode
            +props.order.country

            }</p>
            <p>Customer email:{props.order.email}</p>
            <p>Customer name:{props.order.name}</p>
            <p>Customer deliveryMethod :{props.order.deliveryMethod}</p>

            
            <ul style={{padding:'20px'}}>
                <strong>Ingredients :</strong>
                {Object.keys(props.ingredients).map((key)=>{
                   return <li key={key}>{key+' : '+props.ingredients[key]}</li>;
                })}
                <li key={"price"}>Price : <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></li>
            </ul>    
           
           
        </div>
    );
}

export default order; 