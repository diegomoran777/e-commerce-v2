import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service'
import { ImageService } from './../../services/image-service/image.service';
import { Image } from './../../model/image';
import { Category } from '../../model/category';
import { CategoryService } from './../../services/category/category.service';
import { IFormsComponents } from '../../interfaces/IFormsComponents';
import { SessionService } from './../../services/session/session.service';
import { LocationGoService } from './../../services/location/location-go.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss']
})
export class ImageFormComponent implements OnInit, IFormsComponents {

  categoryId: string = '';
  imageId: string = '';
  category = new Category();
  image = new Image();
  showForm: boolean = true;
  showSpinner: boolean = false;
  private whiteSpace = /^\s+$/;

  constructor(
    private location: LocationGoService, 
    private categoryService: CategoryService, 
    private service: ImageService, 
    private route: ActivatedRoute, 
    private swal: SwalService, 
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.imageId = this.route.snapshot.queryParamMap.get('imageId');
    this.updateOrAdd();
  }

  public isEmptyId() {
    return this.imageId === '';
  }

  private updateOrAdd() {
    if(this.isEmptyId()) {
      this.categoryId = this.route.snapshot.queryParamMap.get('categoryId');
      this.getCategoryById();
      this.image.setCategoryId(this.categoryId);
    } else {
      this.getImage();
    }
  }

  public validWhiteSpace(imageForm: NgForm) {
    return this.whiteSpace.test(imageForm.value.imageType) || 
           this.whiteSpace.test(imageForm.value.imageName);
  }

  public validForm(imageForm: NgForm) {
    return imageForm.valid && !this.validWhiteSpace(imageForm);
  }

  public updateAddImage(imageForm: NgForm) {
    if(this.validForm(imageForm)) {
      return this.isEmptyId() ? this.addImage() : this.updateImage();
     } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    } 
  }

  private getImage() {
    this.service.getImage(this.imageId).subscribe( response => {
      this.image = response;
    }, (error) => {
      console.log(error);
    });
  }

  private addImage() {
    this.service.addImage(this.image).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha agregado con exito!");
    }, (error) => {
      console.log(error);
    });
  }

  private updateImage() {
    this.service.updateImage(this.image).subscribe( response => {
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
      this.image.setCategoryName(this.category.name);
    }, (error) => {
      console.log(error);
    });
  }

}
