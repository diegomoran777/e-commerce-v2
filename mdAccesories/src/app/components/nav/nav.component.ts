import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../services/category/category.service';
import { ICategory } from '../../model/ICategory.model';
import { ProductCartService } from '../../services/product-cart/product-cart.service'; 
import { Constant } from '../../CONST/constant';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activateRole:string;
  userName:string;
  categories: Array<ICategory> = [];
  amountItems: number;
  IMAGES: string = Constant.IMAGES;
  SALES: string = Constant.SALES;

  constructor(
    private productCartService: ProductCartService,
    private service: CategoryService
    ) { }

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role');
    this.userName = sessionStorage.getItem('userName');
    this.getAmountProducts();
    this.getCategories();
  }

  public getCategories() {
    this.service.getCategories().subscribe( response => {
      this.categories = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getAmountProducts() {
    this.productCartService.getCartAllProductsAmount(this.userName).subscribe( response => {
      this.amountItems = response.length;
    });
  }
  
}
