import { Photo } from "./photo";

export class Product {
    id: string;
    numberExtern: string;
    name: string;
    type: string;
    description: string;
    photos: Array<Photo>;
    categoryId: string;
    categoryName: string;
    price: string;
    amount: string;

    constructor() {
        this.photos = new Array<Photo>(
            new Photo(""),
            new Photo(""),
            new Photo(""),
            new Photo(""),
            new Photo(""));
    }


    public getId() {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }

    public setCategoryId(categoryId: string) {
        this.categoryId = categoryId;
    }

    public setNumberExtern(numberExtern: string) {
        this.numberExtern = numberExtern;
    }

    public setName(name: string) {
        this.name = name;
    }
    
    public setType(type: string) {
        this.type = type;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public setPhotos(photos: Array<Photo>) {
        this.photos = photos;
    }

    public setCategoryName(categoryName: string) {
        this.categoryName = categoryName;
    }

    public setPrice(price: string) {
        this.price = price;
    }

    public setAmount(amount: string) {
        this.amount = amount;
    }



    public setAll() {
        this.id = '';
        this.numberExtern = '';
        this.name = '';
        this.type = '';
        this.description = '';
        this.photos = [];
        this.price = '';
    }

}