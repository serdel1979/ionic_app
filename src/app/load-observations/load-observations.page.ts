import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Observation, PhotoBase64, TPhoto } from '../interfaces/reg.interface';
import { IndexDBService } from '../services/index-db.service';


const OBSERVATIONS_KEYS = 'my-observations';
const BASE64 = 'data:image/png;base64,';

@Component({
  selector: 'app-load-observations',
  templateUrl: './load-observations.page.html',
  styleUrls: ['./load-observations.page.scss'],
})
export class LoadObservationsPage {


  name: string = '';
  description: string = '';

  public base64: string | unknown  = '';
  public urlImgBase64 : string = BASE64;

  public observation: Observation = { id: 1, description: "", photos: [] };

  public photo: TPhoto = { id: 1, description: "", photo: undefined, urlPhoto: "" };
  public photosBase64: PhotoBase64[] = [];

  public load: boolean = false;
  public src: string | ArrayBuffer | null = '';
  public imgBlobBase64: any = '';
  
  public renderOk : boolean = false;

  constructor(private modalCtrl: ModalController, private indexDbService:  IndexDBService) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async cargaImg() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    if (image.base64String != undefined) {
      let blob = new Blob([image.base64String], { type: 'image/png' });
      this.src = `${BASE64}${image.base64String}`;
      this.base64 = await this.convertBlobToBase64(blob);
      this.photo.photo = blob;
      this.photo.id = this.observation.photos.length;
      this.load = true;
    }
  }

  addPhoto() {
    //this.observation.photos.push(this.photo);
    // this.photo.urlPhoto = URL.createObjectURL(this.photo.photo!);
    // console.log(this.photo.urlPhoto);
    this.convertBlobToBase64(this.photo.photo!).then(c=>{
      this.photo.urlPhoto = `${BASE64}${c}`;
      this.observation.photos.push(this.photo);
      this.photosBase64.push(
        { 
          id: 1, 
          description: this.photo.description, 
          photo: `${BASE64}${c}`,
          render: true
        }
      );
      console.log(this.photosBase64);
      this.photo = { id: this.observation.photos.length, description: "", photo: undefined, urlPhoto: ""};
      this.load = false;
    })
  }


  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(blob);
  });

 




  confirm() {
    console.log(this,this.observation);
    this.indexDbService.addObservation(this.observation).then(c=>console.log(c));
    // if (!this.load) {
    //   console.log("acá puedo validar datos antes de guardar en bd")
    //   return;
    // }
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
