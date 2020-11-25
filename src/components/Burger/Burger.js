import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) =>{
    
    console.log("burger.js");
    console.log(props);

    let transformedIngredient =   Object.keys(props.ingredients)
        .map(igkey=>{
            
            return [...Array(props.ingredients[igkey])].map((_,i) =>{
               
                return <BurgerIngredient key={igkey+i} type={igkey} />;
            })
        }).reduce((arr,el)=>{
                return arr.concat(el);
        },[]);
        
        /*Arrary(5) will creates an array of size 5 */


       //console.log(transformedIngredient);

       if(transformedIngredient.length===0){
           transformedIngredient =<p>Please start adding ingredients!</p>
       }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger);