import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product/product.service';
import { IProduct } from './../../model/IProduct.model';
import { Photo } from 'src/app/model/photo';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  products: Array<IProduct> = [];
  enter: boolean = true;
  unknownProduct = "../../../assets/images/unknown_person.jpg";

  constructor( private service: ProductService ) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.getProductsByCategoryId();
  }

  public getProductsByCategoryId() {
    this.service.getProductsByCategoryId(1).subscribe( response => {
      this.products = response;
    }, (error) => {
      console.log(error);
    });
  }

  public filterEmpty(photoList: Array<Photo>): Array<Photo> {
    return this.service.filterPhotoList(photoList, this.unknownProduct);
  }

}
