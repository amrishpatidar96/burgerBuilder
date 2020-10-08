import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) =>{

    let attachedClasses = [classes.SideDrawer,classes.Close];

    if(props.showBackdrop)
    {
        attachedClasses = [classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
            <Backdrop clicked={props.closed}  show={props.showBackdrop}/>

            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo} >
                    <Logo />
                </div>
                <nav >
                    <NavigationItems   />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer ;