import {Ingredient} from "./Ingredient";

export class Dish {

    id: number = 0;
    name: string = '';
    recipe: Ingredient[] = [];

    constructor(name: string = "", id: number = 0, recipe: Ingredient[] = []) {
        this.name = name;
        this.id = id;
        this.recipe = recipe;
    }

    updateRecipe([... ingredients]: Ingredient[]) {
        for (let ing of ingredients){
            this.recipe.push(ing);
        }
    }

}
Dish.prototype.toString = function dogToString() {
    return '' + this.name;
}