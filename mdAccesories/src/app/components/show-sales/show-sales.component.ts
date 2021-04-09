import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-sales',
  templateUrl: './show-sales.component.html',
  styleUrls: ['./show-sales.component.css']
})

export class ShowSalesComponent implements OnInit {

  activateRole: string;

  constructor() { }

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role');
  }

  public isAdmin() {
    return this.activateRole === 'ADMIN';
  }

}
