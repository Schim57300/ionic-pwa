import {ADD_DISH, REMOVE_DISH} from "../actions/actions";
import {InitialState} from "./index";
import {Dish} from "../Models/Dish";
import {Ingredient} from "../Models/Ingredient";

const init: InitialState = {
    ingredientList: [],
    dishList: [new Dish("Pâtes carbonara", 1,
        [new Ingredient("Lardons", 3),
            //new Ingredient("Salade verte", 6),
            new Ingredient("Crème", 4),
            new Ingredient("Oeufs", 7),
            //new Ingredient("Poivre", 11),
            //new Ingredient("Basilic", 9),
            // new Ingredient("Huile", 10),
            new Ingredient("Pâtes", 8)])]
};

export function dishesReducer(state: InitialState = init, action: any): InitialState {
    console.log("reducer.dishes");
    switch (action.type) {
        case ADD_DISH:
            console.log("dishes.Add a dish");
            //let newHero = characters_json.find(c=>c.id===action.id);
            return state;
        case REMOVE_DISH:
            let dishes = {} //state.filter(item => item.id !== action.id);
            console.log("dishes.Remove a dish");
            return state;
        default:
            return state;
    }
}

