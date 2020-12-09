import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';



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
            <Toolbar authToken ={this.props.token} clicked = {this.showBackdropAndSideDrawer}/>
            <SideDrawer authToken ={this.props.token} closed={this.closeBackdropAndSideDrawer}  showBackdrop={this.state.showBackdrop}/>
            <main className={classes.Content}>
                {
                    this.props.children   //navigation bar items 
                }      
            </main>        
        </Aux>);
    }
}

const mapStateToProps = (state) =>{
    return {
        token:state.auth.token
    }
}



export default connect(mapStateToProps)(Layout);