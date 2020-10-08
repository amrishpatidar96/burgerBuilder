import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import menuImage from '../../../assets/images/menu.png';


const Toolbar = (props)=>{
    return (
        <header className={classes.Toolbar}  >

            <div className={classes.MobileOnly}>
                <img src={menuImage}  alt="Menu"  onClick={props.clicked}/>
            </div>

            <div className={classes.Logo} >
                <Logo />
            </div>

            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>

        </header>

    );
}

export default Toolbar;