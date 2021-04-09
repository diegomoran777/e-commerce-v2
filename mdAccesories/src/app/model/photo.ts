export class Photo {
    id: string;
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
    
    setName(name: string) {
        this.name = name;
    }
}