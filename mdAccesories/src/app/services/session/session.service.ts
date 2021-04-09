import { Injectable } from '@angular/core';
import { LocationGoService } from './../location/location-go.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private location: LocationGoService) { }

  public verifyUser() {
    if(!sessionStorage.getItem('userName')) {
      this.location.goToTheBeginning();
    }  
  }

  public verifyIsAdmin() {
    return sessionStorage.getItem('role') === 'ADMIN' ? true : this.location.goToTheBeginning();   
  }

  public createSession(userName: string, userRole: string) {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('role', userRole);
  }

  public isUser() {
    return sessionStorage.getItem('role') === 'USER';
  }

}
