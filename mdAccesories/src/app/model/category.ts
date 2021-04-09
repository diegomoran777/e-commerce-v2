export class Category {
    id? : string;
    name? : string;
    description? : string;
    photo? : string;
    type? : string;

    constructor() {
        
    }

    public setClearAll() {
        this.id = '';
        this.name = '';
        this.description = '';
        this.photo = '';
        this.type = '';
    }
}