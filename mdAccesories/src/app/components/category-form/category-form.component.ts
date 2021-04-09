import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../services/swal/swal.service'
import { CategoryService } from '../../services/category/category.service';
import { ProductService } from './../../services/product/product.service';
import { ImageService } from './../../services/image-service/image.service';
import { Category } from '../../model/category';
import { IFormsComponents } from '../../interfaces/IFormsComponents';
import { SessionService } from '../../services/session/session.service';
import { LocationGoService } from '../../services/location/location-go.service';
import { Constant } from '../../CONST/constant';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, IFormsComponents {

  private categoryId: string = '';
  category = new Category(); 
  categoryResponse = new Category();
  showForm: boolean = true;
  showSpinner: boolean = false;
  private whiteSpace = /^\s+$/;

  constructor(
    private location: LocationGoService, 
    private service: CategoryService,
    private productService: ProductService,
    private imageService: ImageService, 
    private route: ActivatedRoute, 
    private swal: SwalService, 
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.categoryId = this.route.snapshot.queryParamMap.get('categoryId'); 
    this.updateOrAdd();
  }

  public isEmptyId() {
    return this.categoryId === '';
  }

  public updateOrAdd() {
    return !this.isEmptyId() ? this.getCategory() : false;
  }

  public validWhiteSpace(categoryForm: NgForm) {
    return this.whiteSpace.test(categoryForm.value.name) || 
           this.whiteSpace.test(categoryForm.value.email);
  }

  public validForm(categoryForm: NgForm) {
    return categoryForm.valid && !this.validWhiteSpace(categoryForm);
  }

  public updateAddCategory(categoryForm: NgForm) {
    if(this.validForm(categoryForm)) {
      return this.isEmptyId() ? this.addCategory() : this.updateCategory();
    } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    }
  }

  public getCategory() {
    this.service.getCategory(this.categoryId).subscribe( response => {
      this.category = response;
    }, (error) => {
      console.log(error);
    });
  }

  public addCategory() {
    this.service.addCategory(this.category).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha agregado con exito!");
    }, (error) => {
      console.log(error);
    });
  }

  public loadCategoryAndUpdateOnProductList() {
    this.service.getCategory(this.categoryId).subscribe( response => {
      this.updateNewCategoryNameOnProductList(response);
    }, (error) => {
      console.log(error);
    });
  }

  public loadCategoryAndUpdateOnImageList() {
    this.service.getCategory(this.categoryId).subscribe( response => {
      this.updateNewCategoryNameOnImageList(response);
    }, (error) => {
      console.log(error);
    });
  }
  
  public updateNewCategoryNameOnProductList(response: Category) {
    this.productService.updateNewCategoryName(this.category.name, response.name).subscribe( response => {
    }, (error) => {
      console.log(error);
    });
  }

  public updateNewCategoryNameOnImageList(response: Category) {
    this.imageService.updateNewCategoryName(this.category.name, response.name).subscribe( response => {
    }, (error) => {
      console.log(error);
    });
  }

  public isSales() {
    return this.category.type === Constant.SALES;
  }

  public updateTypeCategory() {
    if(this.isSales) {
      this.loadCategoryAndUpdateOnProductList();
    }
    this.loadCategoryAndUpdateOnImageList();
  }

  public updateCategory() {
    this.updateTypeCategory();
    this.service.updateCategory(this.category).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha actualizado con exito!");      
    }, (error) => {
      console.log(error);
    });
  }

  public showSpinnerLoadData(response, msj: string) {
    this.showForm = false;
    this.showSpinner = true;
    setTimeout(() => {
      this.categoryResponse = response;
      this.swal.messageSuccess(this.categoryResponse.name + msj);
      this.location.goBack();
    }, 1500);
  }

}
