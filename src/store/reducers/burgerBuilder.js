import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  };

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:   
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName]+1}
            const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updatedObject(state,updatedState);
        case actionTypes.REMOVE_INGREDIENT: 
        const updateIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName]-1}
        const updateIngredients = updatedObject(state.ingredients, updateIngredient);
        const updateState = {
            ingredients: updateIngredients,
            totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        }
        return updatedObject(state,updateState);  
            
        case actionTypes.SET_INGREDIENT:
            return updatedObject(state,{
                ingredients:action.ingredients ,
                error:false, 
                totalPrice:4
            });
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return updatedObject(state,{
                error: action.error
            });
        default:
            return state; 
    }


}   

export default reducer ; 


