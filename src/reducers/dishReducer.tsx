import {ADD_DISH, INIT_DISH, REMOVE_DISH, UPDATE_DISH} from "../actions/actions";
import {InitialState} from "./index";
import {setDishes} from "../services/storageService";

const init: InitialState = {
    ingredientList: [],
    menuList:[],
    dishList: []
};

export function dishesReducer(state: InitialState = init, action: any): InitialState {
    console.log("reducer.dishes");
    switch (action.type) {
        case INIT_DISH:
            console.log("action.data",action.data);
            return {ingredientList: state.dishList, dishList: action.data, menuList: state.menuList};
        case ADD_DISH:
            state.dishList.push(action.data)
            setDishes(state.dishList);
            return state;
        case UPDATE_DISH:
            let foundElement = state.dishList.findIndex(element => element.id === action.data.id);
            let newList = Object.assign([], state.dishList, {[foundElement]: action.data});
            setDishes(state.dishList);
            return {ingredientList: state.ingredientList, dishList: newList, menuList: state.menuList};
        case REMOVE_DISH:
            let elementToRemove = state.dishList.findIndex(element => element.id === action.data.id);
            setDishes(state.dishList);
            state.dishList.splice(elementToRemove, 1);
            return state;
        default:
            return state;
    }
}

