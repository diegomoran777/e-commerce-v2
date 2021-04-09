import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwalService } from '../../services/swal/swal.service'
import { ICategory } from '../../model/ICategory.model';
import { CategoryService } from '../../services/category/category.service';
import { IMainComponents } from '../../interfaces/IMainComponents';
import { SessionService } from '../../services/session/session.service';
import { Constant } from '../../CONST/constant';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .popoverC {
      background: aliceblue;
      color: black;
    }
  `]
})
export class CategoriesComponent implements OnInit, IMainComponents {

  categories: Array<ICategory> = [];
  showSpinners: boolean = false;
  showForm: boolean = false;
  categoryName: string = '';
  enter: boolean = false;
  listView: boolean = false;
  activateRole: string;
  type: string;
  @ViewChild("closeModal") closeModal: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private service: CategoryService, 
    private swal: SwalService, 
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.activateRole = sessionStorage.getItem('role');
    this.route.queryParams.subscribe(param => {
      this.type = param.categoryType; //La categoria puede ser IMAGES o SALES
      this.getCategories(this.type);
      });
  }

  public getCategories(type: string) {
    this.service.getCategoriesByType(type).subscribe( response => {
      this.categories = response;
    }, (error) => {
      console.log(error);
      this.swal.messageInfo('No se han podido cargar las categorias');
    });
  }

  public getCategoryById(categoryForm: NgForm) {
    this.service.getCategoryById(categoryForm.value.categoryId).subscribe( response => {
      if(response[0] === null) {
        this.swal.messageError('No se ha encontrado la categooria');
      } else {
        this.showSpinnersLoadData(response);
      }
    }, (error) => {
      console.log(error);
    });
  }

  public showSpinnersLoadData(response) {
    setTimeout(() => {
      this.categories = response;
      this.closeModal.nativeElement.click();
      this.showSpinners = false;
      setTimeout(() => {
        this.showForm = false;
      }, 1000);
    }, 1500);
    this.showForm = true;
    this.showSpinners = true;
  }

  public deleteCategory(categoryId: any, type: string) {
    return this.isProductCategory(type) ? this.deleteCategoryProducts(categoryId) : this.deleteCategoryImages(categoryId); 
  }

  public isProductCategory(type: string) {
    return type === Constant.SALES;
  }

  public deleteCategoryProducts(categoryId: any) {
    this.service.deleteCategoryProductsById(categoryId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("La categoria " + categoryId + " ha sido eliminada");
        this.getCategories(this.type);
      } else {
        this.swal.messageError("No se ha podido eliminar la categoria " + categoryId);
      }
    });
  }

  public deleteCategoryImages(categoryId: any) {
    this.service.deleteCategoryImagesById(categoryId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("La categoria " + categoryId + " ha sido eliminada");
        this.getCategories(this.type);
      } else {
        this.swal.messageError("No se ha podido eliminar la categoria " + categoryId);
      }
    });
  }

  public getCategoryByName(event) {
    this.categoryName = event.target.value;
    this.searchByParams();
  }

  public searchByParams() {
    this.service.getCategoriesByParams(this.categoryName, this.type).subscribe( response => {
      this.categories = response;
    }, (error) => {
      console.log(error);
    });
  }

  public areYouSure(categoryId: any, type: string) {
    this.swal.confirm("Esta seguro que desea eliminar la categoria " + categoryId + "?")
    .then(response => {
      if (response.value) {
        this.deleteCategory(categoryId, type);    
      }
    });
  }

  public changeView() {
    if(this.listView) {
      this.listView = false;
      this.enter = true;
    } else {
      this.listView = true;
      setTimeout(() => {
        this.enter = false;
      }, 1500);
    }
  }

  public isUser() {
    return this.session.isUser()
  }

  public isType(type: string) {
    return type === 'Venta';
  }

}
