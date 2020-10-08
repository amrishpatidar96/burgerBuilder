import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    orderBtnDisabled: true,
    purchasing: false,
  };

  purchaseContinueHandler = () => {
    alert("You Continue");
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

    for (let key in this.state.ingredients) {
      console.log("before" + key + ":" + this.state.ingredients[key]);
    }

    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    for (let key in this.state.ingredients) {
      console.log("after" + key + ":" + this.state.ingredients[key]);
    }
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

  render() {
    // console.log("burger")

    let disabledInfo = { ...this.state.ingredients };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
          ></OrderSummary>
        </Modal>

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
  }
}

export default BurgerBuilder;
