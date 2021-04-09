import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { SessionService } from './../../services/session/session.service';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service';
import { ISale } from './../../model/ISale.model';
import { Sale } from './../../model/sale';
import { IMainComponents } from '../../interfaces/IMainComponents';
import { SaleServiceService } from './../../services/sale-service/sale-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})

export class SalesComponent implements OnInit, IMainComponents {

  date: string = '';
  isDelivered : any;
  userNameParam: string = '';
  userMail: string = '';
  productsById: string;
  sales: Array<ISale> = [];
  showSpinners: boolean = false;
  showForm: boolean = false;
  userName: string;
  @ViewChild("closeModal") closeModal: ElementRef;

  constructor(
    private session: SessionService,
    private service: SaleServiceService,
    private swal: SwalService
  ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.session.verifyIsAdmin();
    this.userName = sessionStorage.getItem('userName');
    this.getSales();
  }

  public getSales() {
    this.service.getSales().subscribe( response => {
      this.sales = response;
    });
  }

  public getSaleById(saleForm: NgForm) {
    this.getSalesById(saleForm.value.saleId);
  }

  public getSalesById(saleId: any) {
    this.service.getSalesById(saleId).subscribe( response => {
      this.verifyResponse(response);
    }, (error) => {
      console.log(error);
    });
  }

  public verifyResponse(response) {
    if(response[0] === null) {
      this.swal.messageError("No se ha encontrado la venta");
    } else {
      this.showSpinnersLoadData(response);
    }
  }

  public showSpinnersLoadData(response) {
    setTimeout(() => {
      this.sales = response;
      this.closeModal.nativeElement.click();
      this.showSpinners = false;
      setTimeout(() => {
        this.showForm = false;
      }, 1000);
    }, 1500);
    this.showForm = true;
    this.showSpinners = true;
  }

  public areYouSure(saleId: any) {
    this.swal.confirm("Esta seguro que desea eliminar la venta " + saleId + "?")
    .then(response => {
      if (response.value) {
        this.deleteSale(saleId);    
      }
    });
  }

  public deleteSale(saleId: any) {
    this.service.deleteSaleById(saleId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("La venta " + saleId + " ha sido eliminada");
        this.getSales();
      } else {
        this.swal.messageError("No se ha podido eliminar la venta " + saleId);
      }
    });
  }

  public getSaleByDate(event) {
    this.date = event.target.value;
    this.searchByParams();
  }

  public getDelivered(event) {
    this.isDelivered = event.target.value;
    this.getSalesByDelivered();
  }

  public getUserName(event) {
    this.userNameParam = event.target.value;
    this.searchByParams();
  }

  public getUserMail(event) {
    this.userMail = event.target.value;
    this.searchByParams();
  }

  public getSalesByDelivered() {
    this.service.getSalesByDelivered(this.isDelivered).subscribe( response => {
      this.sales = response;
    }, (error) => {
      console.log(error);
    });
  }

  public searchByParams() {
    this.service.getSalesByParams(
      this.date,  
      this.userNameParam, 
      this.userMail).subscribe( response => {
        this.sales = response;
      }, (error) => {
        console.log(error);
      });
  }

  public changeDeliver(sale: Sale) {
    this.service.changeDeliver(sale).subscribe( response => {
      this.getSales();
    }, (error) => {
      console.log(error);
    });
  }

  public wasDelivered(delivered) {
    return delivered === true;
  }

  public isEmptySales() {
    return this.sales.length === 0;
  }

}
