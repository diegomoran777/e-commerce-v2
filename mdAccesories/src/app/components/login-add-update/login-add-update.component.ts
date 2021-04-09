import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service';
import { IFormsComponents } from '../../interfaces/IFormsComponents';
import { UserService } from './../../services/user/user.service';
import { User } from './../../model/user';
import { SessionService } from './../../services/session/session.service';
import { LocationGoService } from './../../services/location/location-go.service';
import { ProductCartService } from '../../services/product-cart/product-cart.service';
import { SaleServiceService } from '../../services/sale-service/sale-service.service';
import * as crypto from 'crypto-js';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-add-update',
  templateUrl: './login-add-update.component.html',
  styleUrls: ['./login-add-update.component.scss']
})
export class LoginAddUpdateComponent implements OnInit, IFormsComponents {

  user = new User();
  private currentUserName: string = sessionStorage.getItem('userName');
  private userName: string = '';
  showForm: boolean = true;
  showSpinner: boolean = false;
  disabled: boolean = true;
  activateRole: string;
  passes: boolean = true;
  private whiteSpace = /^\s+$/;

  constructor(
    private route: ActivatedRoute,
    private swal: SwalService,
    private service: UserService,
    private session: SessionService,
    private location: LocationGoService,
    private productCartService: ProductCartService,
    private saleService: SaleServiceService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role');
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    this.isRegistered();
  }

  private isRegistered(): void {
    if(this.activateRole === null) {
      this.passes = false;
      this.clearForm();
    } else {
      this.loadUsers();
    }
  }

  public isCurrentUser() {
    return this.userName === null || this.userName === this.currentUserName;
  }

  public loadUsers() {
    return this.isCurrentUser() ? this.loadCurrentUser() : this.loadUser();
  }

  public loadCurrentUser(): void {
    this.service.getUserByUserName(this.currentUserName).subscribe( response => {
      this.loadDataUsers(response);
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  public loadUser(): void {
    this.service.getUserByUserName(this.userName).subscribe( response => {
      this.loadDataUsers(response);
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  private loadDataUsers(response: User) {
    this.user = response;
    this.user.repeatPass = response.password;
    this.user.unchangedPass = response.password;
    this.user.unchangedUserName = response.userName;
    this.user.unchangedEmail = response.email;
  }

  public clearForm() {
        this.user.id = '';
        this.user.userName = '';
        this.user.password = '';
        this.user.repeatPass = '';
        this.user.role = 'USER';
        this.user.email = '';
  }

  public validWhiteSpace(userForm: NgForm) {
    return this.whiteSpace.test(userForm.value.userName) || 
           this.whiteSpace.test(userForm.value.password) || 
           this.whiteSpace.test(userForm.value.repeatPass);
  }

  public matchPass() {
    return this.user.password === this.user.repeatPass;
  }

  public validForm(userForm: NgForm) {
    return userForm.valid && 
    !this.validWhiteSpace(userForm) && 
    this.matchPass(); 
  }

  public isActivatedUser(userForm: NgForm) {
     if(this.activateRole === null) {
       userForm.value.userId = '';
     } else {
       userForm.value.userId = this.user.id;
     }
  }

  public updateAddUser(userForm: NgForm): void {
    this.isActivatedUser(userForm);
    if(this.validForm(userForm)) {
      return userForm.value.userId === '' || userForm.value.userId === undefined ? this.existsUserAndAdd(userForm.value.userName, userForm.value.email) : this.existsUserAndUpdate(userForm.value.userName, userForm.value.email);
    } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    }
  }

  public addUser() {
    this.service.addUser(this.user).subscribe( response => {
      this.showSpinnerLoadData(response, " Se ha agregado con exito!")
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  public updateNewUserNameOnlistCart() {
    this.productCartService.updateNewUserNameOnLists(this.user.userName, this.user.unchangedUserName).subscribe( response => {
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  public updateNewUserNameOnListsSales() {
    this.saleService.updateNewUserName(this.user.userName, this.user.unchangedUserName).subscribe( response => {
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  public updateUser() {
    this.updateNewUserNameOnlistCart();
    this.updateNewUserNameOnListsSales();
    this.service.updateUser(this.user).subscribe( response => {
      if(this.isCurrentUser()) {
        this.session.createSession(response.userName, response.role);
      }
      this.showSpinnerLoadData(response, " Se ha actualizado con exito!"); 
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  showSpinnerLoadData(response: User, msj: string): void {
    this.showForm = false;
    this.showSpinner = true;
    setTimeout(() => {
      this.swal.messageSuccess(response.userName + msj);
      this.location.goBack();
    }, 1500);
  }

  private passEncode(): void {
    if(this.user.password !== this.user.unchangedPass) {
      this.user.password = crypto.SHA256(this.user.password).toString();
    }
  }

  public existsUserAndUpdate(userName: string, email: string) {
    this.service.existsUserName(userName).subscribe( existsUserName => {
      this.service.existsUserBYEmail(email).subscribe( existsEmail => {
        this.canUpdate(existsUserName, existsEmail);
      });
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  public existsUserAndAdd(userName: string, email: string) {
    this.service.existsUserName(userName).subscribe( existsUserName => {
      this.service.existsUserBYEmail(email).subscribe(existsEmail => {
        this.canAdd(existsUserName, existsEmail);
      });
    }, (error) => {
      this.toastr.error("Ha ocurrido un error en el servidor", "Error", { timeOut: 3000});
      //console.log(error);
    });
  }

  public canAdd(existsUserName, existsEmail) {
    return !existsUserName && !existsEmail ? this.addUser() : 
    this.swal.messageInfo("Email o usuario existente, pruebe con otro y vuelva a intentarlo!");
  }

  public canUpdate(existsUserName, existsEmail) {
    if(this.cantUpdateByUsername(existsUserName) || this.cantUpdateByEmail(existsEmail)) {
      this.swal.messageInfo("Usuario o mail existente, pruebe con otro y vuelva a intentarlo!");  
    } else {
      this.passEncode();
      this.updateUser(); 
    }
  }

  public sameUserName(): boolean {
    return this.user.userName === this.user.unchangedUserName;
  }

  public sameEmail(): boolean {
    return this.user.email.toUpperCase() === this.user.unchangedEmail.toUpperCase();
  }

  public cantUpdateByUsername(existUserName) {
    return existUserName && !this.sameUserName();
  }

  public cantUpdateByEmail(existEmail) {
    return existEmail && !this.sameEmail();
  }

  public allowedRole(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }

  public disabledPass(e): void {
    if(e.target.checked) {
      this.passes = false;
      this.user.password = '';
      this.user.repeatPass = '';
    } else {
      this.passes = true;
      this.loadUsers();
    }
  }

}