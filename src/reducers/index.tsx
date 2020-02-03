import {combineReducers, createStore} from 'redux';
import {ingredientsReducer } from './ingredientReducer';
import {dishesReducer } from './dishReducer';
import {menuReducer} from "./menuReducer";
import {Ingredient} from "../Models/Ingredient";
import {Dish} from "../Models/Dish";
import {Menu} from "../Models/Menu";

export interface InitialState {
    ingredientList: Ingredient[]
    dishList: Dish[]
    menuList: Menu[]
}

export interface IRootState {
    ingredients: InitialState,
    dishes: InitialState,
    menus: InitialState
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        ingredients: ingredientsReducer,
        dishes: dishesReducer,
        menus: menuReducer
    }));


export default store;