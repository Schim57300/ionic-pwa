export class Ingredient {

    static checkIngredientJsonFormat(obj: any) : boolean  {
        return (Array.isArray(obj) &&
            !obj.some((element: any) =>  !element.id || !element.name));
    }

    id: number = 0;
    name: string = '';

    constructor(name: string = "", id: number = 0) {
        this.id = id;
        this.name = name;
    }
}

