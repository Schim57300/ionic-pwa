import {ADD_MENU, REMOVE_MENU, UPDATE_MENU} from "../actions/actions";
import {InitialState} from "./index";
import {Menu, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY} from "../Models/Menu";
import DICTIONARY from '../services/storageService';

const init: InitialState = {
    ingredientList: [],
    dishList: [],
    menuList:[
        new Menu(DICTIONARY.db.MONDAY, 1, MONDAY, []),
        new Menu(DICTIONARY.db.TUESDAY, 2, TUESDAY, []),
        new Menu(DICTIONARY.db.WEDNESDAY, 3, WEDNESDAY, []),
        new Menu(DICTIONARY.db.THURSDAY, 4, THURSDAY, []),
        new Menu(DICTIONARY.db.FRIDAY, 5, FRIDAY, []),
        new Menu(DICTIONARY.db.SATURDAY, 6, SATURDAY, []),
        new Menu(DICTIONARY.db.SUNDAY, 7, SUNDAY, [])
    ]
};

export function menuReducer(state: InitialState = init, action: any): InitialState {
    console.log("reducer.menus");
    switch (action.type) {
        case ADD_MENU:
            return state;
        case UPDATE_MENU:
            return state;
        case REMOVE_MENU:
            return state;
        default:
            return state;
    }
}

