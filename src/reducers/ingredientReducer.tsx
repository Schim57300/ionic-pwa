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
        new Ingredient("Poivre", 11)
    ],
    dishList: []
};
export function ingredientsReducer(state: InitialState = init, action: any): InitialState {
    console.log("reducer.ingredient");
    switch(action.type) {
        case ADD_INGREDIENT:
            console.log("ingredients.Add an ing");
            state.ingredientList.push(action.data)
            return state;
        case UPDATE_INGREDIENT:
            console.log("ingredients.Update an ing");
            let foundElement = state.ingredientList.findIndex(element => element.id === action.data.id);
            let newList = Object.assign([], state.ingredientList, {[foundElement]: action.data});
            return {ingredientList: newList, dishList: state.dishList};
        case REMOVE_INGREDIENT:
            console.log("ingredients.Remove an ing");
            let elementToRemove = state.ingredientList.findIndex(element => element.id === action.data.id);
            state.ingredientList.splice(elementToRemove, 1);
            return {ingredientList: state.ingredientList, dishList: state.dishList};
        default:
            return state;
    }

}
