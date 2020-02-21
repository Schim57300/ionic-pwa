import {Dish} from "./Dish";
import {MenuItem} from "./MenuItem";


export const MONDAY: string = "monday";
export const TUESDAY: string = "monday";
export const WEDNESDAY: string = "monday";
export const THURSDAY: string = "monday";
export const FRIDAY: string = "monday";
export const SATURDAY: string = "monday";
export const SUNDAY: string = "monday";


export class Menu {

    static checkMenuJsonFormat(obj: any) : boolean  {
        return (Array.isArray(obj) &&
            !obj.some((element: any) => (!element.id || !element.name ||
                (element.lunchMeal && !Dish.checkDishJsonFormat(element.lunchMeal)) ||
                (element.dinnerMeal && !Dish.checkDishJsonFormat(element.dinnerMeal)) )))
    }


    id: number = 0;
    name: string = '';
    color: string = "";
    lunchMeal: MenuItem[] = [];
    dinnerMeal: MenuItem[] = [];

    constructor(name: string = "", id: number = 0, color: string = "", lunchMeal: MenuItem[] = [], dinnerMeal: MenuItem[] = []) {
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