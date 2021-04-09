import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationGoService {

  constructor(
    private location: Location,
    private router: Router 
  ) { }

  public goBack() {
    this.location.back();
  }

  public goCategories() {
    return this.location;
  }

  public goCategory() {
    this.router.navigate(['/categories']);
  }

  public goHome() {
    this.router.navigate(['/products'], { queryParams: {categoryId: 1 , productsById: true} });
  }

  public goMp(path) {
    window.location.href = path;
  }

  public goToTheBeginning() {
    this.router.navigate(['/']);
  }
}
