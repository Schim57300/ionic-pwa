import {combineReducers, createStore} from 'redux';
import {ingredientsReducer } from './ingredientReducer';
import {dishesReducer } from './dishReducer';
import {menuReducer} from "./menuReducer";
import {Ingredient} from "../Models/Ingredient";
import {Dish} from "../Models/Dish";
import {Menu} from "../Models/Menu";
import {notificationReducer} from "./notificationReducer";

export interface InitialState {
    ingredientList: Ingredient[]
    dishList: Dish[]
    menuList: Menu[]
    displayToast: boolean,
    toastMessage: string,
    toastType: string
}

export const initialStateImpl : InitialState = {
    ingredientList: [],
    menuList:[],
    dishList: [],
    displayToast: false,
    toastMessage: "",
    toastType: ""
}

export interface IRootState {
    ingredientReducer: InitialState,
    dishReducer: InitialState,
    menuReducer: InitialState,
    notificationReducer: InitialState
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        ingredientReducer: ingredientsReducer,
        dishReducer: dishesReducer,
        menuReducer: menuReducer,
        notificationReducer: notificationReducer
    }));


export default store;