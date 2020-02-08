import {ADD_INGREDIENT, INIT_INGREDIENT, REMOVE_INGREDIENT, UPDATE_INGREDIENT} from "../actions/actions";
import {InitialState} from "./index";

import { setIngredients} from "../services/storageService";

const init: InitialState = {

    ingredientList: [],
    dishList: [],
    menuList:[]
};
export function ingredientsReducer(state: InitialState = init, action: any): InitialState {
    console.log("reducer.ingredient");
    switch(action.type) {
        case INIT_INGREDIENT:
            console.log("action.data",action.data);
            return {ingredientList: action.data, dishList: state.dishList, menuList: state.menuList};
        case ADD_INGREDIENT:
            state.ingredientList.push(action.data)
            setIngredients(state.ingredientList);
            return state;
        case UPDATE_INGREDIENT:
            let foundElement = state.ingredientList.findIndex(element => element.id === action.data.id);
            let newList = Object.assign([], state.ingredientList, {[foundElement]: action.data});
            setIngredients(state.ingredientList);
            return {ingredientList: newList, dishList: state.dishList, menuList: state.menuList};
        case REMOVE_INGREDIENT:
            let elementToRemove = state.ingredientList.findIndex(element => element.id === action.data.id);
            state.ingredientList.splice(elementToRemove, 1);
            setIngredients(state.ingredientList);
            return state;
        default:
            return state;
    }

}
