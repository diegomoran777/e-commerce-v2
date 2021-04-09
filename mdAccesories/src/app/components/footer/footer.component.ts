import { Component, OnInit } from '@angular/core';
import { Constant } from '../../CONST/constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  IMAGES: string = Constant.IMAGES;
  SALES: string = Constant.SALES;
  activateRole: string;

  constructor() { }

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role');
  }

}
