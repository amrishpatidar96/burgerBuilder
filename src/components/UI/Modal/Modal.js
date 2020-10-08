import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const modal = (props) => (
    <Aux>
        <Backdrop 
            show={props.show}    
            className={classes.Modal} 
            clicked={props.modalClosed} />
            
        <div  
            className={classes.Modal} 
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', 
                opacity: props.show ? '1' : 0 
            }}
            >
            {
                props.children   //orderSummary
            }
        </div>
    </Aux>
);

export default modal ;