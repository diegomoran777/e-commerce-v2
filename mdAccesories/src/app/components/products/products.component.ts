import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service';
import { ProductService } from './../../services/product/product.service';
import { CategoryService   } from './../../services/category/category.service';
import { IProduct } from './../../model/IProduct.model';
import { Product } from './../../model/product';
import { IMainComponents } from '../../interfaces/IMainComponents';
import { NavComponent } from './../nav/nav.component';
import { ShowCartAmountComponent } from './../show-cart-amount/show-cart-amount.component';
import { SessionService } from './../../services/session/session.service';
import { ProductCartService } from '../../services/product-cart/product-cart.service'; 
import { ToastrService } from 'ngx-toastr';
import { Photo } from 'src/app/model/photo';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'], 
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .popoverC {
      background: aliceblue;
      color: black;
    }
  `]
})

export class ProductsComponent implements OnInit, IMainComponents {

  productsById: string;
  categoryId: string = '';
  addButton: boolean;
  products: Array<IProduct> = [];
  types: any = [];
  productName: string = '';
  productNumberEx: string = '';
  selectedType: string = '';
  showSpinners: boolean = false;
  showForm: boolean = false;
  listCardView: boolean = true;
  listGroupView: boolean = false;
  adminView: boolean = false;
  enter: boolean = true;
  activateRole: string;
  userName: string;
  categoryName: string = ''; 
  unknownProduct = "../../../assets/images/unknown_person.jpg";
  @ViewChild(ShowCartAmountComponent) showCartAmount: ShowCartAmountComponent;
  @ViewChild(NavComponent) nav: NavComponent;
  @ViewChild("closeModal") closeModal: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private service: ProductService,
    private categoryService: CategoryService,
    private productCartService: ProductCartService, 
    private swal: SwalService,
    private session: SessionService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.activateRole = sessionStorage.getItem('role');
    this.userName = sessionStorage.getItem('userName');
    this.infoToast();
    this.route.queryParams.subscribe(param => {
      this.productsById = param.productsById;
      this.categoryId = param.categoryId;
      this.getProducts();
      });
  }

  public getProducts() {
    if(this.productsById === 'true') {
      //this.categoryId = this.route.snapshot.queryParamMap.get('categoryId');
      this.addButton = true;
      this.getProductsByCategoryId();
      this.getTypesById();
    } 
  }

  public getProductsButton() {
    this.getProductsByCategoryId();
  }

  public getProductById(productForm: NgForm) {
    if(this.productsById === 'true') {
      this.getProductsByCategoryAndProductId(productForm.value.productId);
    } else {
       this.getProductsById(productForm.value.productId);
    }
  }

  public getProductsById(productId: any) {
    this.service.getProductsById(productId).subscribe( response => {
      this.verifyResponse(response);
    }, (error) => {
      console.log(error);
    });
  }

  public getProductsByCategoryAndProductId(productId: any) {
    this.service.getProductsByCategoryAndProductId(this.categoryId, productId).subscribe( response => {
      this.verifyResponse(response);
    }, (error) => {
      console.log(error);
    });
  }

  public verifyResponse(response) {
    if(response[0] === null) {
      this.swal.messageError("No se ha encontrado el producto");
    } else {
      this.showSpinnersLoadData(response);
    }
  }

  public showSpinnersLoadData(response) {
    setTimeout(() => {
      this.products = response;
      this.closeModal.nativeElement.click();
      this.showSpinners = false;
      setTimeout(() => {
        this.showForm = false;
      }, 1000);
    }, 1500);
    this.showForm = true;
    this.showSpinners = true;
  }

  public getProductsByCategoryId() {
    this.service.getProductsByCategoryId(this.categoryId).subscribe( response => {
      this.products = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getAllTypes() {
    this.service.getAllTypes().subscribe( response => {
      this.types = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getTypesById() {
    this.service.getTypesById(this.categoryId).subscribe( response => {
      this.types = response;
    }, (error) => {
      console.log(error);
    });
  }

  public areYouSure(productId: any) {
    this.swal.confirm("Esta seguro que desea eliminar el producto " + productId + "?")
    .then(response => {
      if (response.value) {
        this.deleteProduct(productId);    
      }
    });
  }

  public deleteProduct(productId: any) {
    this.service.deleteProductById(productId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("El producto " + productId + " ha sido eliminado");
        this.getProductsByCategoryId();
      } else {
        this.swal.messageError("No se ha podido eliminar el producto " + productId);
      }
    });
  }

  public getProductByName(event) {
    this.productName = event.target.value;
    this.searchByParams();
  }

  public getProductByNumber(event) {
    this.productNumberEx = event.target.value;
    this.searchByParams();
  }

  public getProductByType(event) {
    this.selectedType = event.target.value;
    this.searchByParams();
  }

  public searchByParams() {
    this.service.getProductsByParams(
      this.productName, 
      this.productNumberEx, 
      this.selectedType, 
      this.categoryId).subscribe( response => {
        this.products = response;
      }, (error) => {
        console.log(error);
      });
  }

  public adminViewState() {
    this.listCardView = false;
    this.listGroupView = false;
    this.adminView = true;
  }

  public viewState() {
    if(this.listGroupView || this.adminView) {
      this.adminView = false;
      this.listGroupView = false;
      this.listCardView = true;
      this.enter = true;
    } else {
      this.adminView = false;
      this.listCardView = false;
      this.listGroupView = true;
      setTimeout(() => {
        this.enter = false;
      }, 1500);
    }
  }

  public listGroupViewState() {
    this.adminView = false;
    this.listCardView = false;
    this.listGroupView = true;
  }

  public addToCart(product: Product) {
    this.productCartService.addProductToCart(this.userName, product).subscribe( response => {
      if(response) {
        this.nav.getAmountProducts();
        this.showCartAmount.getAmountProducts();
        this.showCartAmount.getProducCartList();
        this.swal.messageSuccess("El producto " + product.name + " ha sido agregado");
      } else {
        this.swal.messageError("No se pudo agregar el producto " + product.name);
      }
    });
  }

  public getCategoryName(categoryId) {
    this.categoryService.getCategory(categoryId).subscribe( response => {
      this.categoryName = response.name;
    }, (error) => {
      console.log(error);
    });
    return this.categoryName;
  }

  public isUser() {
    return this.activateRole === 'USER';
  }

  private infoToast() {
    return this.isUser() ? this.toastr.info('Presione el carrito a su izquierda para acceder al registro de compras', 'Registro de compras', {
      disableTimeOut: true
    }) : false;
  }

  public filterEmpty(photoList: Array<Photo>): Array<Photo> {
    return this.service.filterPhotoList(photoList, this.unknownProduct);
  }

}
