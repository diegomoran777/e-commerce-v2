import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service'
import { ProductService } from './../../services/product/product.service';
import { Product } from './../../model/product';
import { Category } from '../../model/category';
import { CategoryService } from './../../services/category/category.service';
import { IFormsComponents } from '../../interfaces/IFormsComponents';
import { SessionService } from './../../services/session/session.service';
import { LocationGoService } from './../../services/location/location-go.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, IFormsComponents {

  categoryId: string = '';
  productId: string = '';
  category = new Category();
  product: Product = new Product();
  showForm: boolean = true;
  showSpinner: boolean = false;
  showPhotoInputs: boolean = false;
  buttonText: string = 'Agregar fotos';
  private whiteSpace = /^\s+$/;

  constructor(
    private location: LocationGoService, 
    private categoryService: CategoryService, 
    private service: ProductService, 
    private route: ActivatedRoute, 
    private swal: SwalService, 
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.productId = this.route.snapshot.queryParamMap.get('productId');
    this.updateOrAdd();
  }

  public isEmptyId() {
    return this.productId === '';
  }

  private updateOrAdd() {
    if(this.isEmptyId()) {
      this.categoryId = this.route.snapshot.queryParamMap.get('categoryId');
      this.getCategoryById();
      this.product.setCategoryId(this.categoryId);
    } else {
      this.getProduct();
    }
  }

  public validWhiteSpace(productForm: NgForm) {
    return this.whiteSpace.test(productForm.value.productType) || 
           this.whiteSpace.test(productForm.value.productName);
  }

  public validForm(productForm: NgForm) {
    return productForm.valid && !this.validWhiteSpace(productForm);
  }

  public updateAddProduct(productForm: NgForm) {
    if(this.validForm(productForm)) {
      return this.isEmptyId() ? this.addProduct() : this.updateProduct();
     } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    } 
  }

  private getProduct() {
    this.service.getProduct(this.productId).subscribe( response => {
      this.product = response;
    }, (error) => {
      console.log(error);
    });
  }

  private addProduct() {
    this.service.addProduct(this.product).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha agregado con exito!");
    }, (error) => {
      console.log(error);
    });
  }

  private updateProduct() {
    this.service.updateProduct(this.product).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha actualizado con exito!");
    }, (error) => {
      console.log(error);
    });
  }

  public showSpinnerLoadData(response, msj: string) {
    this.showForm = false;
    this.showSpinner = true;
    setTimeout(() => {
      this.swal.messageSuccess(response.name + msj);
      this.location.goBack();
    }, 1500);
  }

  private getCategoryById() {
    this.categoryService.getCategory(this.categoryId).subscribe( response => {
      this.category = response;
      this.product.setCategoryName(this.category.name);
    }, (error) => {
      console.log(error);
    });
  }

  public photoAdd(): string {
    this.showPhotoInputs = !this.showPhotoInputs;
    return this.showPhotoInputs ? this.buttonText = 'Volver al formulario' : this.buttonText = 'Agregar fotos';
  }

}
