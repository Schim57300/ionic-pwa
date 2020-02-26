export class Section {

    static checkSectionJsonFormat(obj: any) : boolean  {
        return (Array.isArray(obj) &&
            !obj.some((element: any) => (!element.id || !element.name || !element.order)));
    }

    id: number = 0;
    name: string = '';
    order: number = 0;

    constructor(name: string = "", id: number = 0, order: number = 0) {
        this.name = name;
        this.id = id;
        this.order = order;
    }
}

Section.prototype.toString = function sectionToString() {
    return '' + this.name;
};