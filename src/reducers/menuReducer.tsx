import {ADD_MENU, REMOVE_MENU, UPDATE_MENU} from "../actions/actions";
import {InitialState} from "./index";
import {Menu, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY} from "../Models/Menu";

const init: InitialState = {
    ingredientList: [],
    dishList: [],
    menuList:[
        new Menu("Monday", 1, MONDAY, []),
        new Menu("Tuesday", 2, TUESDAY, []),
        new Menu("Wednesday", 3, WEDNESDAY, []),
        new Menu("Thursday", 4, THURSDAY, []),
        new Menu("Friday", 5, FRIDAY, []),
        new Menu("Saturday", 6, SATURDAY, []),
        new Menu("Sunday", 7, SUNDAY, [])
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

