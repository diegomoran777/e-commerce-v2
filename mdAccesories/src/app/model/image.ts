export class Image {
    id: string;
    name: string;
    type: string;
    description: string;
    photo: string;
    categoryId: string;
    categoryName: string;

    constructor() {

    }

    public setCategoryId(categoryId: string) {
        this.categoryId = categoryId;
    }

    public setCategoryName(categoryName: string) {
        this.categoryName = categoryName;
    }

    public setAll() {
        this.id = '';
        this.name = '';
        this.type = '';
        this.description = '';
        this.photo = '';
    }
}