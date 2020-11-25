import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";



export const addIngredient  = (ingredientName)=>{
    return { 
        type:actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
}

export const removeIngredient  = (ingredientName)=>{
    return { 
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
}


export const setIngredients  = (ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}                   

export const fetchIngredientAsnc = ()=>{

    return (dispatch) => {

        axios.get("https://burger-builder-9b4c7.firebaseio.com/ingredients.json")
      .then((response) => {

        dispatch(setIngredients(response.data));
        
      }).catch(error => {

        dispatch(fetchIngredientFailed(true))
      });
        
    }


}

export const fetchIngredientFailed = (error)=>{
    return {
        type:actionTypes.FETCH_INGREDIENT_FAILED,
        error: error
    }
}