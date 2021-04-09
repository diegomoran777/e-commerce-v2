import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginAddUpdateComponent } from './components/login-add-update/login-add-update.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ImagesComponent } from './components/images-component/images.component';
import { ImageFormComponent } from './components/image-form/image-form.component';
import { CartPayComponent } from './components/cart-pay/cart-pay.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SalesComponent } from './components/sales/sales.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { EnterComponent } from './components/enter/enter.component';
import {ProductDetailComponent } from './components/product-detail/product-detail.component';


const routes: Routes = [
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pieChart', component: PieChartComponent },
  { path: 'lineChart', component: LineChartComponent },
  { path: 'doughnutChart', component: DoughnutChartComponent },
  { path: 'barChart', component: BarChartComponent },
  //{ path: 'home', component: HomeComponent },
  { path: 'purchase', component: PurchasesComponent },
  { path: 'sales', component: SalesComponent },
  //{ path: 'categories', component: CategoriesComponent },
  { path: 'cart-pay', component: CartPayComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/all', component: ProductsComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'image-form', component: ImageFormComponent },
  { path: 'category-form', component: CategoryFormComponent },
  { path: 'login-form', component: LoginAddUpdateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: EnterComponent, pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
