import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionCreaters from "../../store/actions/index";



class BurgerBuilder extends Component {
  state = {
    orderBtnDisabled: true,
    purchasing: false,
    loading: false,
    
  };

  purchaseContinueHandler = () => {
   
    this.props.history.push({
      pathname: "/checkout"});
  };

  purchaseHandler = () => {
    if(this.props.authToken)
    {
      this.setState({ purchasing: true });
    }
    else{
      //set redirect path to /checkout
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  orderButtonDisabledInfo = (newIngredients) => {
    const sum = Object.keys(newIngredients)
      .map((igKey) => {
        return newIngredients[igKey];
      })
      .reduce((accum, element) => accum + element, 0);

    return (sum > 0 ) ? false : true;
    
  };
  
  
  componentWillMount()
  {
    this.props.onPurchaseInit();
  }
  
  componentDidMount() {
      this.props.onIngredientFetched();
  }


  render() {
    //console.log("[BurgerBuilder.js] rendering...");

    let orderSummary = null;

    let burger = this.props.error ? (
      <p style={{ marginTop: "60px" }}>ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    let disabledInfo = { ...this.props.ingredients };

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />

          <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientsRemoved={this.props.onIngredientRemoved}
              disabledInfo={disabledInfo   /* for particular less button in BuildControl */   }
              totalPrice={this.props.price}
              orderBtnDisabled={this.orderButtonDisabledInfo(this.props.ingredients)}
              ordered={this.purchaseHandler}
              isAuth={this.props.authToken?true:false}
          />
          </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        ></OrderSummary>
      );
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>

        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    authToken:state.auth.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => {
     
      dispatch(actionCreaters.addIngredient(ingredientName));
    },
    onIngredientRemoved: (ingredientName) => {
     
      dispatch(actionCreaters.removeIngredient(ingredientName));
    },
    onIngredientFetched: () => {
      dispatch(actionCreaters.fetchIngredientAsnc());
    },
    onPurchaseInit : () =>dispatch(actionCreaters.purchaseInit()),//action related to order.js

    onSetAuthRedirectPath: (path) =>dispatch(actionCreaters.setAuthRedirectPath(path))

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));



