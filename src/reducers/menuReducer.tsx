import {ADD_MENU, INIT_MENU, REMOVE_MENU, UPDATE_MENU} from "../actions/actions";
import {InitialState, initialStateImpl} from "./index";
import {setMenus} from '../services/storageService';


export function menuReducer(state: InitialState = initialStateImpl, action: any): InitialState {
    switch (action.type) {
        case INIT_MENU:
            return Object.assign({}, state, {menuList: action.data});
        case ADD_MENU:
            setMenus(state.menuList);
            return state;
        case UPDATE_MENU:
            let foundElement = state.menuList.findIndex(element => element.id === action.data.id);
            let newList = Object.assign([], state.menuList, {[foundElement]: action.data});
            setMenus(newList);
            return Object.assign({}, state, {menuList: newList });
        case REMOVE_MENU:
            setMenus(state.menuList);
            return state;
        default:
            return state;
    }
}

