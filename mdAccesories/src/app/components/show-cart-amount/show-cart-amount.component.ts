import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductCartService } from '../../services/product-cart/product-cart.service';
import { Product } from './../../model/product';


@Component({
  selector: 'app-show-cart-amount',
  templateUrl: './show-cart-amount.component.html',
  styleUrls: ['./show-cart-amount.component.css']
})
export class ShowCartAmountComponent implements OnInit {

  products: Array<Product> = [];
  amountItems: number;
  userName:string;
  subtotal: number = 0;
  activateRole: string;
  @ViewChild("open") open: ElementRef;
  unknownProduct = "../../../assets/images/unknown_person.jpg";

  constructor(private productCartService: ProductCartService) { }

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role');
    this.userName = sessionStorage.getItem('userName');
    this.getAmountProducts();
    this.getProducCartList();
  }

  public getAmountProducts() {
    this.productCartService.getCartAllProductsAmount(this.userName).subscribe( response => {
      this.amountItems = response.length;
    }, (error) => {
      console.log(error);
    });
  }

  public getProducCartList() {
    this.productCartService.getCartAllProducts(this.userName).subscribe( response => {
      this.products = response;
      this.getSubtotal();
    }, (error) => {
      console.log(error);
    });
  }

  public getSubtotal() {
    this.subtotal = 0;
    this.products.forEach(p => this.subtotal += parseFloat(p.price) * parseFloat(p.amount));
  }

  public openList() {
    this.open.nativeElement.click();
  }

  public isUknownProduct(photo) {
    return photo === '---' ? this.unknownProduct : photo;
  }

}
