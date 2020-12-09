import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';



class Auth extends Component
{   
    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:3,
                    maxLength:20
                },
                valid:false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6,
                    maxLength:20
                },
                valid:false,
                touched: false
            }
        },
        isSignUp: true
    }

   switchAuthModeHandler = ()=>{
       this.setState(prevState=>{
           return {
               isSignUp:!prevState.isSignUp
           };
       })
   }

    inputChangeHandler = (event,controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({controls:updatedControls});
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

    submitHandler = (event)=> {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    }


    render(){

        console.log(this.props);


        const formElementArray = [];
        for(let key in this.state.controls) {
          formElementArray.push({
            id:key,
            config: this.state.controls[key]
          });
        }

        

        let form = formElementArray.map(
            formElement => (
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
            )
        );

        if(this.props.loading)
        {
            form = <Spinner />
        }
        
        let visible = 'hidden'; 
        visible = this.props.error ?  'visible' : 'hidden';

        const style = {color:'red',fontSize:'0.8em',visibility: visible};

        console.log("token:"+this.props.authToken);
        const isAuthenticated = this.props.authToken ? (<Redirect to={this.props.authRedirectPath}/>):null;
        //if user is authenticated than we are sending user to homepage




        return (
            <div className={classes.Auth}>
                {isAuthenticated}
                <span style={style}>{this.props.error}</span>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >
                        SUBMIT
                    </Button> 
                </form>

                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGNIN':'SIGNUP'}
                </Button> 
            </div>
        );
    }

    componentDidMount() {
        if(!(this.props.price>4.0))
        {
            this.props.onSetAuthRedirectPath("/");
        }
    }

    componentWillUnmount(){
        console.log("unmouted component")
    }


}

const mapStateToProps = state =>{

    return {
        loading : state.auth.loading,
        error : state.auth.error,
        authToken:state.auth.token,
        price:state.burgerBuilder.totalPrice,
        authRedirectPath:state.auth.authRedirectPath
    };
}


const mapDispatchToProps = (dispatch) => {
    return {
        onAuth:(email,password,isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
        onSetAuthRedirectPath: (path) =>dispatch(actions.setAuthRedirectPath(path))
    };
};


export default connect(mapStateToProps, mapDispatchToProps) (Auth);