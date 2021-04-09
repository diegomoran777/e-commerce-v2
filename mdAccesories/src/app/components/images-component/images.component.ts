import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service';
import { ImageService } from './../../services/image-service/image.service'; 
import { IImage } from './../../model/IImage.model'; 
import { IMainComponents } from '../../interfaces/IMainComponents';
import { SessionService } from './../../services/session/session.service'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'], 
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .popoverC {
      background: aliceblue;
      color: black;
    }
  `]
})

export class ImagesComponent implements OnInit, IMainComponents {

  imagesById: string;
  categoryId: string = '';
  addButton: boolean;
  images: Array<IImage> = [];
  types: any = [];
  imageName: string = '';
  selectedType: string = '';
  showSpinners: boolean = false;
  showForm: boolean = false;
  listCardView: boolean = true;
  listGroupView: boolean = false;
  adminView: boolean = false;
  enter: boolean = true;
  activateRole: string;
  unknownImage = "../../../assets/images/unknown_person.jpg";
  @ViewChild("closeModal") closeModal: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private service: ImageService, 
    private swal: SwalService,
    private session: SessionService
    ) { }

  ngOnInit(): void {
    //this.session.verifyUser();
    this.activateRole = sessionStorage.getItem('role');
    this.route.queryParams.subscribe(param => {
      this.imagesById = param.imagesById;
      this.categoryId = param.categoryId;
      this.getImages();
      });
  }

  public getImages() {
    if(this.imagesById === 'true') {
      //this.categoryId = this.route.snapshot.queryParamMap.get('categoryId');
      this.addButton = true;
      this.getImagesByCategoryId();
      this.getTypesById();
    } 
  }

  public getImagesButton() {
    this.getImagesByCategoryId();
  }

  public getImageById(imageForm: NgForm) {
    if(this.imagesById === 'true') {
      this.getImagesByCategoryAndImageId(imageForm.value.imageId);
    } else {
       this.getImagesById(imageForm.value.imageId);
    }
  }

  public getImagesById(imageId: any) {
    this.service.getImagesById(imageId).subscribe( response => {
      this.verifyResponse(response);
    }, (error) => {
      console.log(error);
    });
  }

  public getImagesByCategoryAndImageId(imageId: any) {
    this.service.getImagesByCategoryAndImageId(this.categoryId, imageId).subscribe( response => {
      this.verifyResponse(response);
    }, (error) => {
      console.log(error);
    });
  }

  public verifyResponse(response) {
    if(response[0] === null) {
      this.swal.messageError("No se ha encontrado la  imagen");
    } else {
      this.showSpinnersLoadData(response);
    }
  }

  public showSpinnersLoadData(response) {
    setTimeout(() => {
      this.images = response;
      this.closeModal.nativeElement.click();
      this.showSpinners = false;
      setTimeout(() => {
        this.showForm = false;
      }, 1000);
    }, 1500);
    this.showForm = true;
    this.showSpinners = true;
  }

  public getImagesByCategoryId() {
    this.service.getImagesByCategoryId(this.categoryId).subscribe( response => {
      this.images = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getAllTypes() {
    this.service.getAllTypes().subscribe( response => {
      this.types = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getTypesById() {
    this.service.getTypesById(this.categoryId).subscribe( response => {
      this.types = response;
    }, (error) => {
      console.log(error);
    });
  }

  public areYouSure(imageId: any) {
    this.swal.confirm("Esta seguro que desea eliminar la imagen " + imageId + "?")
    .then(response => {
      if (response.value) {
        this.deleteImage(imageId);    
      }
    });
  }

  public deleteImage(imageId: any) {
    this.service.deleteImageById(imageId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("La imagen " + imageId + " ha sido eliminada");
        this.getImagesByCategoryId();
      } else {
        this.swal.messageError("No se ha podido eliminar la imagen " + imageId);
      }
    });
  }

  public getImageByName(event) {
    this.imageName = event.target.value;
    this.searchByParams();
  }

  public getImageByType(event) {
    this.selectedType = event.target.value;
    this.searchByParams();
  }

  public searchByParams() {
    this.service.getImagesByParams(
      this.imageName,  
      this.selectedType, 
      this.categoryId).subscribe( response => {
        this.images = response;
      }, (error) => {
        console.log(error);
      });
  }

  public adminViewState() {
    this.listCardView = false;
    this.listGroupView = false;
    this.adminView = true;
  }

  public viewState() {
    if(this.listGroupView || this.adminView) {
      this.adminView = false;
      this.listGroupView = false;
      this.listCardView = true;
      this.enter = true;
    } else {
      this.adminView = false;
      this.listCardView = false;
      this.listGroupView = true;
      setTimeout(() => {
        this.enter = false;
      }, 1500);
    }
  }

  public isUser() {
    return this.session.isUser();
  }

  public isUknownImage(photo) {
    return photo === '---' ? this.unknownImage : photo;
  }

}
