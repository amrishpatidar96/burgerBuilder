import * as actionTypes from '../actions/actionTypes';

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
            return { 
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]+1   //overriding a property dynamically
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT: 
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName]-1 ,  //overriding a property dynamically . it is not an array 
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };  
            
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients:action.ingredients ,
                error:false, 
                totalPrice:4
            };
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state; 
    }


}   

export default reducer ; 


