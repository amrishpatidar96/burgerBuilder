import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';



class Checkout extends Component {
    
    checkoutCancelledHandler = ()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data'); 
    }

    componentWillUnmount(){
        console.log('[checkout.js] unmouted');
    }

    render() {
        let summary ;
        let purchasedStatus  ;


        if(this.props.ingredients)
        {   
            purchasedStatus = this.props.purchased ? (<Redirect to="/" />):null;
            
            summary = (<CheckoutSummary  
                ingredients={this.props.ingredients}
                checkoutCancelledHandler = {this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                
                />);
        }
        else{
            summary = <Redirect to="/" />
        }
        
        return(
            <div>
                {purchasedStatus}
                {summary}
                {console.log("path new "+this.props.match.path)}
                { <Route 
                    path={this.props.match.path+'/contact-data'} 
                    component={ContactData}
                    
                    /> }
            </div>
        );
    }

}

const mapStateToProps = (state) =>{
    return {
        ingredients: state.burgerBuilder.ingredients, 
        purchased:state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);