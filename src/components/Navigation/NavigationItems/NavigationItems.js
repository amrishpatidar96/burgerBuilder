import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {

   console.log("navigationItems"+props.authToken);


   return (<ul  className={classes.NavigationItems} 
      >
     <NavigationItem exact link="/"    >
         Burger Builder
      </NavigationItem>
      
      {
      props.authToken
      ?<NavigationItem link="/orders" >Orders</NavigationItem>
      :null
      }

      {
         props.authToken 
         ? <NavigationItem link="/logout" > Logout</NavigationItem>
         : <NavigationItem link="/auth" > Authentication</NavigationItem>
      }
 </ul>)
};



export default navigationItems;