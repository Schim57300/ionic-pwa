export class Ingredient {

    id: number = 0;
    name: string = '';

    constructor(name: string = "", id: number = 0) {
        this.id = id;
        this.name = name;
    }
}
