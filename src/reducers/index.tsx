import {combineReducers, createStore} from 'redux';
import {ingredientsReducer } from './ingredientReducer';
import {dishesReducer } from './dishReducer';
import {Ingredient} from "../Models/Ingredient";
import {Dish} from "../Models/Dish";

export interface InitialState {
    ingredientList: Ingredient[]
    dishList: Dish[]
}

export interface IRootState {
    ingredients: InitialState,
    dishes: InitialState
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        ingredients: ingredientsReducer,
        dishes: dishesReducer
    }));

export const defaultInit: InitialState = {
    ingredientList: [new Ingredient("Carotte", 1), new Ingredient("Petits pois", 2)],
    dishList: []
};

export default store;