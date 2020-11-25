import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'




class ContactData extends Component 
{
    state = {
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
                
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {  
                   options:[
                       {value: 'fastest',displayValue: 'Fastest'},
                       {value: 'cheapest',displayValue: 'Cheapest'}
                   ]
                },
                value:'cheapest'
            },
        },
        isFormValid:false,
    }


    checkValidity(value,rules) {
        let isValid = false;

        if(!rules) {
            return false ;
        }
        if(rules.required )
        {
            isValid = value.trim() !== '' ;
        }

        if(rules.maxLength)
        {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.minLength)
        {
            isValid = value.length >= rules.minLength && isValid;
        }

        
        return isValid ? true:false;
    }



    orderHandler = (event)=> {
        event.preventDefault(); // when we use button inside 
        //form when we click on that it request to server and 
        //submit the data and refresh the page  and change the data into Input
        // tag to null . to prevent refresh on clicking the button we use it .
       
        //console.log(this.props.ingredients);
        const formData = {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }


        const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData
        };

        this.props.onOrderBurger(order);

       
    }

    inputChangeHandler = (event,inputIdentifier) => {
        //console.log(event.target.value);
        console.log("inputchangeHandler");
        const updatedOrderForm = {
            ...this.state.orderForm
        }; //shallow copy

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        } //deep copy

        updatedFormElement.value = event.target.value;
        
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
            
        updatedFormElement.touched = true;
       
        updatedOrderForm[inputIdentifier] = updatedFormElement;   
        //console.log(updatedFormElement);   
        let isFormValid = true;
        
        for(let inputIdentifier in updatedOrderForm) {

            if(inputIdentifier !== 'deliveryMethod')
            {   
                //console.log(updatedOrderForm[inputIdentifier].valid);
                isFormValid = isFormValid && updatedOrderForm[inputIdentifier].valid;
            }
            
        }

        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid});

    } 

    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm) {
          formElementArray.push({
            id:key,
            config: this.state.orderForm[key]
          });
        }


        let form = (<form  onSubmit={this.orderHandler}>

            {formElementArray.map(formElement =>(
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    changed={(event) =>{this.inputChangeHandler(event,formElement.id)}}
                    hasValidation = {formElement.config.validation}
                    touched = {formElement.config.touched}
                    />
            ))}
            <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
        </form>);

        if(this.props.loading)
        {
            form= <Spinner />;
        }



        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
   
}

const mapStateToProps = (state)=>{
    return {
        ingredients: state.burgerBuilder.burgingredients,
        price:state.burgerBuilder.totalPrice,
        loading: state.order.loading   
    }
}

const mapDispatchToProps = dispatch =>{
 
    return {
        onOrderBurger :(orderData)=>dispatch(actions.purchaseBurger(orderData))
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios)); 