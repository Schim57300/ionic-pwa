import {Dish} from "./Dish";


export const MONDAY: string = "monday";
export const TUESDAY: string = "monday";
export const WEDNESDAY: string = "monday";
export const THURSDAY: string = "monday";
export const FRIDAY: string = "monday";
export const SATURDAY: string = "monday";
export const SUNDAY: string = "monday";

export class Menu {

    id: number = 0;
    name: string = '';
    color: string = "";
    lunchMeal: Dish[] = [];
    dinnerMeal: Dish[] = [];

    constructor(name: string = "", id: number = 0, color: string = "", lunchMeal: Dish[] = [], dinnerMeal: Dish[] = []) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.lunchMeal = lunchMeal;
        this.dinnerMeal = dinnerMeal;
    }
}
Menu.prototype.toString = function menuToString() {
    return '' + this.name;
}