import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../services/session/session.service';
import { Constant } from '../../CONST/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  IMAGES: string = Constant.IMAGES;
  SALES: string = Constant.SALES;

  constructor(private session: SessionService) { }

  ngOnInit(): void {
    this.session.verifyUser();
  }

}
