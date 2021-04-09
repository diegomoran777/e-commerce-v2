import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAddUpdateComponent } from './components/login-add-update/login-add-update.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { ImageService } from './services/image-service/image.service';
import { UserService } from './services/user/user.service';
import { SwalService } from './services/swal/swal.service';
import { SessionService } from './services/session/session.service';
import { LocationGoService } from './services/location/location-go.service';
import { ProductCartService } from './services/product-cart/product-cart.service';
import { MpServiceService } from './services/mp-service/mp-service.service';
import { SaleServiceService } from './services/sale-service/sale-service.service';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { HomeComponent } from './components/home/home.component';
import { ImagesComponent } from './components/images-component/images.component';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { CarrouselAlternativeComponent } from './components/carrousel-alternative/carrousel-alternative/carrousel-alternative.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShowCartAmountComponent } from './components/show-cart-amount/show-cart-amount.component';
import { CartPayComponent } from './components/cart-pay/cart-pay.component';
import { SalesComponent } from './components/sales/sales.component';
import { ShowSalesComponent } from './components/show-sales/show-sales.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { ShowPurchasesComponent } from './components/show-purchases/show-purchases.component';
import { NavChartsComponent } from './components/nav-charts/nav-charts.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { EnterComponent } from './components/enter/enter.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CategoriesComponent,
    ProductsComponent,
    LoginComponent,
    LoginAddUpdateComponent,
    ProductFormComponent,
    CategoryFormComponent,
    NotFoundComponent,
    UserListComponent,
    CarrouselComponent,
    HomeComponent,
    ImagesComponent,
    ImageFormComponent,
    CarrouselAlternativeComponent,
    FooterComponent,
    ShowCartAmountComponent,
    CartPayComponent,
    SalesComponent,
    ShowSalesComponent,
    PurchasesComponent,
    ShowPurchasesComponent,
    NavChartsComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    DoughnutChartComponent,
    EnterComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    CategoryService,
    ProductService,
    ImageService,
    UserService,
    SwalService,
    SessionService,
    LocationGoService,
    ProductCartService,
    MpServiceService,
    SaleServiceService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
