import { Component, OnInit } from '@angular/core';
import { IPurchase } from './../../model/IPurchase';
import { UserService } from '../../services/user/user.service';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  purchases: Array<IPurchase> = [];
  activateRole: string;
  userName: string;
  date_approved: string = '';

  constructor(
    private userService: UserService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.activateRole = sessionStorage.getItem('role');
    this.userName = sessionStorage.getItem('userName');
    this.getPurchases();
  }

  public getPurchases() {
    this.userService.getPurchases(this.userName).subscribe(response => {
      this.purchases = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getPurchasesByDate(event) {
    console.log(event.target.value);
    this.date_approved = event.target.value;
    this.searchByParams();
  }

  public isEmptyPurchases() {
    return this.purchases.length === 0;
  }

  public searchByParams() {
    this.userService.getPurchasesByParamsDate(this.date_approved, this.userName).subscribe(response => {
      this.purchases = response;
    }, (error) => {
      console.log(error);
    })
  }

}
