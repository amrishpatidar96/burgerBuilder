import React from 'react';

import classes from './Button.module.css';

const button =(props)=>{ 
    let btnStyle =[classes.Button];
    //console.log("disabled"+props.disabled);
    if(props.btnType==="Danger")
        btnStyle.push(classes.Danger);
    if(props.btnType==="Success")
        btnStyle.push(classes.Success);
        
    return (
        <button 
        className={btnStyle.join(' ')} 
        disabled={props.disabled}
        onClick={props.clicked}           
        >
            {props.children}   
        </button>);
};


export default button;