import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user/user.service';
import { User } from './../../model/user';
import { SwalService } from './../../services/swal/swal.service';
import { SessionService } from './../../services/session/session.service';
import { LocationGoService } from './../../services/location/location-go.service';
import * as crypto from 'crypto-js';
import { IFormsComponents } from './../../interfaces/IFormsComponents';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, IFormsComponents {

  private user = new User();
  private whiteSpace = /^\s+$/;

  constructor(
    private service: UserService, 
    private swal: SwalService, 
    private session: SessionService,
    private location: LocationGoService
    ) { }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  public validWhiteSpace(userForm: NgForm) {
    return this.whiteSpace.test(userForm.value.userName) || 
           this.whiteSpace.test(userForm.value.password);
  }

  public validForm(userForm: NgForm) {
    return userForm.valid && !this.validWhiteSpace(userForm);
  }

  public getUserByUserName(userForm: NgForm) {
    let pass = crypto.SHA256(userForm.value.password).toString();
    this.service.validateUser(userForm.value.userName, pass).subscribe( response => {
      if(response) {
        this.user = response;
        this.session.createSession(this.user.userName, this.user.role);
        this.location.goHome();
      } else {
        this.swal.messageError('Nombre de Usuario o Contraseña incorrecto');  
      }
    }, (error) => {
      console.log(error);
    });
  }

  public validateLogin(userForm: NgForm) {
    if(this.validForm(userForm)) {
      this.getUserByUserName(userForm);
    } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    }
  }

  showSpinnerLoadData(response: any, msj: string): void {
    throw new Error("Method not implemented.");
  }

}
