import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product/product.service';
import { Product } from './../../model/product';
import { Photo } from 'src/app/model/photo';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  enter: boolean = true;
  productId: any = '';
  unknownProduct = "../../../assets/images/unknown_person.jpg";

  constructor( private service: ProductService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProductById();
  }

  public getProductById() {
    this.service.getProduct(this.productId).subscribe( response => {
      this.product = response;
    }, (error) => {
      console.log(error);
    });
  }

  public filterEmpty(photoList: Array<Photo>): Array<Photo> {
    return this.service.filterPhotoList(photoList, this.unknownProduct);
  }

}
