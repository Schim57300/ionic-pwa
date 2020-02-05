import {ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_INGREDIENT} from "../actions/actions";
import {InitialState} from "./index";
import {Ingredient} from "../Models/Ingredient";

const init: InitialState = {
    ingredientList: [new Ingredient("Carotte", 1),
        new Ingredient("Petits pois", 2),
        new Ingredient("Lardons", 3),
        new Ingredient("Crème", 4),
        new Ingredient("Salade verte", 5),
        new Ingredient("Oignons", 6),
        new Ingredient("Oeufs", 7),
        new Ingredient("Pâtes", 8),
        new Ingredient("Basilic", 9),
        new Ingredient("Huile", 10),
        new Ingredient("Poulet", 11),
        new Ingredient("Boeuf", 12),
        new Ingredient("Pâte à tarte", 13),
        new Ingredient("Courgettes", 14),
        new Ingredient("Riz (risotto)", 15),
        new Ingredient("Riz", 16),
        new Ingredient("Cordons bleus", 17),
        new Ingredient("Légumes divers", 18),
        new Ingredient("Jambon", 19)
    ],
    dishList: [],
    menuList:[]
};
export function ingredientsReducer(state: InitialState = init, action: any): InitialState {
    console.log("reducer.ingredient");
    switch(action.type) {
        case ADD_INGREDIENT:
            state.ingredientList.push(action.data)
            return state;
        case UPDATE_INGREDIENT:
            let foundElement = state.ingredientList.findIndex(element => element.id === action.data.id);
            let newList = Object.assign([], state.ingredientList, {[foundElement]: action.data});
            return {ingredientList: newList, dishList: state.dishList, menuList: state.menuList};
        case REMOVE_INGREDIENT:
            let elementToRemove = state.ingredientList.findIndex(element => element.id === action.data.id);
            state.ingredientList.splice(elementToRemove, 1);
            return state;
        default:
            return state;
    }

}
