import {Unit} from "../services/storageService";
import {Section} from "./Section";

export class Ingredient {

    static checkIngredientJsonFormat(obj: any) : boolean  {
        return (Array.isArray(obj) &&
            !obj.some((element: any) =>  !element.id || !element.name));
    }

    id: number = 0;
    name: string = '';
    unit: Unit = Unit.PIECE;
    section: Section = new Section();

    constructor(name: string = "", id: number = 0, section: Section = new Section(), unit: Unit = Unit.PIECE) {
        this.id = id;
        this.name = name;
        this.section = section
        this.unit = unit;
    }
}


