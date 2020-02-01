import {Ingredient} from "../Models/Ingredient";
import {Dish} from "../Models/Dish";

export const ADD_DISH = 'ADD_DISH';
export const REMOVE_DISH = 'REMOVE_DISH';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';


export function addDish(element: Dish) {
    const action = {
        type: ADD_DISH,
        data: element
    }

    return action;
}

export function removeDishById(id: number) {
    const action = {
        type: REMOVE_DISH,
        data: id
    }
    return action;
}

/**
 * INGREDIENTS
 */
export function addIngredient(element: Ingredient) {
    const action = {
        type: ADD_INGREDIENT,
        data: element
    }

    return action;
}

export function removeIngredient(element: Ingredient) {
    const action = {
        type: REMOVE_INGREDIENT,
        data: element
    }
    return action;
}

export function updateIngredient(element: Ingredient) {
    const action = {
        type: UPDATE_INGREDIENT,
        data: element
    }
    return action;
}