import { Component, OnInit } from '@angular/core';
import { LocationGoService } from './../../services/location/location-go.service';
import { SwalService } from './../../services/swal/swal.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private swal: SwalService,
    private location: LocationGoService
  ) { }

  ngOnInit(): void {
    this.swal.messageError("No es posible alcanzar el enlace, verifiquelo y vuelva a intentarlo!");
    setTimeout(() => {
      this.location.goBack();
    }, 1500);
  }

}
