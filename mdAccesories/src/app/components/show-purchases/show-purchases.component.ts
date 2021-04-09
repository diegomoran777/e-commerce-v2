import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-purchases',
  templateUrl: './show-purchases.component.html',
  styleUrls: ['./show-purchases.component.css']
})
export class ShowPurchasesComponent implements OnInit {

  activateRole: string;

  constructor() { }

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role');
  }

  public isUser() {
    return this.activateRole === 'USER';
  }

}
