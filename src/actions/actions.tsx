import {Ingredient} from "../Models/Ingredient";
import {Dish} from "../Models/Dish";
import {Menu} from "../Models/Menu";


export const IMPORT_DATA = 'IMPORT_DATA';

export const INIT_INGREDIENT = 'INIT_INGREDIENT';
export const INIT_DISH = 'INIT_DISH';
export const INIT_MENU = 'INIT_MENU';

export const ADD_DISH = 'ADD_DISH';
export const UPDATE_DISH = 'UPDATE_DISH';
export const REMOVE_DISH = 'REMOVE_DISH';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const ADD_MENU = 'ADD_MENU';
export const UPDATE_MENU = 'UPDATE_MENU';
export const REMOVE_MENU = 'REMOVE_MENU';

export const DISPLAY_TOAST = 'DISPLAY_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';



/**
 * APP INIT
 */
export function prepareIngredientList(element: Ingredient[]) {
    const action = {
        type: INIT_INGREDIENT,
        data: element
    }

    return action;
}

export function prepareDishList(element: Dish[]) {
    const action = {
        type: INIT_DISH,
        data: element
    }

    return action;
}

export function prepareMenuList(element: Menu[]) {
    const action = {
        type: INIT_MENU,
        data: element
    }

    return action;
}

export function importData(menus: Menu[], dishes: Dish[], ingredients: Ingredient[]) {
    const action = {
        type: IMPORT_DATA,
        data: {menus, dishes, ingredients}
    }

    return action;
}



/**
 * DISHES
 */
export function addDish(element: Dish) {
    const action = {
        type: ADD_DISH,
        data: element
    }

    return action;
}

export function removeDish(element: Dish) {
    const action = {
        type: REMOVE_DISH,
        data: element
    }
    return action;
}

export function updateDish(element: Dish) {
    const action = {
        type: UPDATE_DISH,
        data: element
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

/**
 * MENU
 */
export function updateMenu(element: Menu) {
    const action = {
        type: UPDATE_MENU,
        data: element
    }
    return action;
}
/**
 * TOAST
 */
export function displayToast(type: string, message: string) {
    const action = {
        type: DISPLAY_TOAST,
        data: {message, type}
    }
    return action;
}

export function hideToast() {
    const action = {
        type: HIDE_TOAST,
        data: {}
    }
    return action;
}