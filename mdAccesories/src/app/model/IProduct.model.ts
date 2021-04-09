import { Photo } from './photo';

export interface IProduct {
    id? : string,
    numberExtern? : string,
    name? : string,
    type? : string,
    description? : string,
    photos? : Array<Photo>,
    categoryId? : string,
    categoryName? : string,
    price? : string,
}