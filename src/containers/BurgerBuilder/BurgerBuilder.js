import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    orderBtnDisabled: true,
    purchasing: false,
    loading: false,
    error:false
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "amrish",
        address: {
          street: "223 street 11",
          zipcode: "41325",
          country: "United",
        },
        email: "amrish@gmail.com",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ loading: false, purchasing: false });
      });

    //alert("You Continue");
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
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

    if (sum > 0) this.setState({ orderBtnDisabled: false });
    else this.setState({ orderBtnDisabled: true });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredient = {
      ...this.state.ingredients,
    };

    updatedIngredient[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });

    this.orderButtonDisabledInfo(updatedIngredient);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;

    const updatedIngredient = {
      ...this.state.ingredients,
    };

    updatedIngredient[type] = updatedCount;

    const priceReduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceReduction;

    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });

    this.orderButtonDisabledInfo(updatedIngredient);
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-9b4c7.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      }).catch(error => {
        this.setState({error: true});
      });
  }

  render() {
    //console.log("[BurgerBuilder.js] rendering...");

    let orderSummary = null;

    let burger = this.state.error ?<p style={{marginTop:'60px'}}>ingredients can't be loaded</p>:<Spinner />;
    let disabledInfo = { ...this.state.ingredients };

    if(this.state.ingredients)
      { 

        burger = (
          <Aux>
            <Burger ingredients={this.state.ingredients} />
    
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientsRemoved={this.removeIngredientHandler}
              disabledInfo={disabledInfo}
              totalPrice={this.state.totalPrice}
              orderBtnDisabled={this.state.orderBtnDisabled}
              ordered={this.purchaseHandler}
            />
    
          </Aux>
        );

        orderSummary = (
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
