import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../services/session/session.service';
import { ProductCartService } from '../../services/product-cart/product-cart.service';
import { MpServiceService } from '../../services/mp-service/mp-service.service';
import { LocationGoService } from '../../services/location/location-go.service';
import { Product } from './../../model/product';

@Component({
  selector: 'app-cart-pay',
  templateUrl: './cart-pay.component.html',
  styleUrls: ['./cart-pay.component.css']
})
export class CartPayComponent implements OnInit {

  products: Array<Product> = [];
  userName:string;
  total: number = 0;
  unknownProduct = "https://yt3.ggpht.com/a-/AAuE7mDzizyNwY7MnEDA-4SkyCJTiP-F67ZqS--K_g=s240-mo-c-c0xffffffff-rj-k-no";

  constructor(
    private session: SessionService,
    private productCartService: ProductCartService,
    private mpService: MpServiceService,
    private location: LocationGoService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.userName = sessionStorage.getItem('userName');
    this.getProductCartList();
  }

  public getProductCartList() {
    this.productCartService.getCartAllProducts(this.userName).subscribe( response => {
      this.products = response;
      this.getTotal();
    }, (error) => {
      console.log(error);
    });
  }

  public getTotal() {
    this.total = 0;
    this.products.forEach(p => this.total += parseFloat(p.price) * parseFloat(p.amount));
  }

  public deleteOneProductFromCart(productId) {
    this.productCartService.deleteOneProductFromCart(this.userName, productId).subscribe( response => {
      this.getProductCartList();
    });
  }

  public deleteAllProductsByPIdFromCart(productId) {
    this.productCartService.deleteAllProductsByProductIdFromCart(this.userName, productId).subscribe( response => {
      this.getProductCartList();
    }, (error) => {
      console.log(error);
    });
  }

  public cantPay() {
    return this.products === undefined || this.products.length === 0;
  }

  public goMp() {
    this.mpService.goMp(this.userName).subscribe( response => {
      //console.log("ACA",response['response']);
      this.location.goMp(response['response']);
    }, (error) => {
      console.log(error);
    })
  }

  public isUknownProduct(photo) {
    return photo === '---' ? this.unknownProduct : photo;
  }

}
