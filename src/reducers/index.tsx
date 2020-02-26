import {combineReducers, createStore} from 'redux';
import {ingredientsReducer } from './ingredientReducer';
import {dishesReducer } from './dishReducer';
import {menuReducer} from "./menuReducer";
import {Ingredient} from "../Models/Ingredient";
import {Dish} from "../Models/Dish";
import {Menu} from "../Models/Menu";
import {notificationReducer} from "./notificationReducer";
import {Section} from "../Models/Section";
import {sectionReducer} from "./sectionReducer";

export interface InitialState {
    ingredientList: Ingredient[]
    dishList: Dish[]
    menuList: Menu[]
    sectionList: Section[]
    displayToast: boolean,
    toastMessage: string,
    toastType: string
}

export const initialStateImpl : InitialState = {
    ingredientList: [],
    dishList: [],
    menuList:[],
    sectionList: [],
    displayToast: false,
    toastMessage: "",
    toastType: ""
}

export interface IRootState {
    ingredientReducer: InitialState,
    dishReducer: InitialState,
    sectionReducer: InitialState,
    menuReducer: InitialState,
    notificationReducer: InitialState
}

const store = createStore<IRootState, any, any, any>(
    combineReducers({
        ingredientReducer: ingredientsReducer,
        dishReducer: dishesReducer,
        sectionReducer: sectionReducer,
        menuReducer: menuReducer,
        notificationReducer: notificationReducer
    }));


export default store;