import {Dish} from "./Dish";


export const MONDAY: string = "monday";
export const TUESDAY: string = "tuesday";
export const WEDNESDAY: string = "wednesday";
export const THURSDAY: string = "thursday";
export const FRIDAY: string = "friday";
export const SATURDAY: string = "saturday";
export const SUNDAY: string = "sunday";

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