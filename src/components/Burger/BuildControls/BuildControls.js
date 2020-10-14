import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from '../BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
    
];


const buildControls = (props)=>{
    console.log("buildcontrols");
    return (
        <div className={classes.BuildControls}>
            <p> totalPrice :<strong>{props.totalPrice.toFixed(2)}</strong></p>

            {controls.map(ctrl=>(
                <BuildControl 
                key={ctrl.label}  
                label={ctrl.label}
                added={()=>props.ingredientAdded(ctrl.type)}
                removed={()=>props.ingredientsRemoved(ctrl.type)}
                disabledInfo={props.disabledInfo[ctrl.type]}

                />
            ))}

            <button 
            className={classes.OrderButton}      
            disabled={props.orderBtnDisabled}  
            onClick={props.ordered}   
            >
            ORDER NOW
            </button>
        </div>
    )
}

export default buildControls;