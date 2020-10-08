import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component
{   
    state = {
        showBackdrop:false,
        showSideDrawer:false
    }

    showBackdropAndSideDrawer = ()=>{
        this.setState((prevState,props)=>{
            return {
                showBackdrop:true,
                showSideDrawer:true
            }
        });
    }

    closeBackdropAndSideDrawer = ()=>{
        this.setState((prevState,props)=>{
            return {
                showBackdrop:false,
                showSideDrawer:false
            }
        });
    }

    render(){
        return (
        <Aux>
            <Toolbar clicked = {this.showBackdropAndSideDrawer}/>
            <SideDrawer closed={this.closeBackdropAndSideDrawer}  showBackdrop={this.state.showBackdrop}/>
            <main className={classes.Content}>
                {
                    this.props.children   //Burger Builder Component 
                }      
            </main>        
        </Aux>);
    }
}

export default Layout;