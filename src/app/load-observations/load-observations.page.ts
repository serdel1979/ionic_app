import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Observation, PhotoBase64, TPhoto } from '../interfaces/reg.interface';
import { IndexDBService } from '../services/index-db.service';
import { uuId } from '../utils/uuid.function';


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

  public observation: Observation = { id: uuId(), description: "", photos: [] };

  public photo: TPhoto = { id: uuId(), description: "", photo: undefined, urlPhoto: "" };
  public photosBase64: PhotoBase64[] = [];

  public load: boolean = false;
  public src: string | ArrayBuffer | null = '';
  public imgBlobBase64: any = '';
  
  public renderOk : boolean = false;

  public edition: boolean = false;

  myParameterObservation: any;

  constructor(private modalCtrl: ModalController, private indexDbService:  IndexDBService, private navParams: NavParams) {
  }

  ionViewWillEnter() { 
    this.myParameterObservation = this.navParams.get('observation');
    this.edition = this.myParameterObservation = this.navParams.get('edition');
  }

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
      this.photo.id = uuId();
      this.photo.urlPhoto = this.src;
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
      // this.photosBase64.push(
      //   { 
      //     id: uuId(), 
      //     description: this.photo.description, 
      //     photo: `${BASE64}${c}`,
      //     render: true
      //   }
      // );
      this.photo = { id: uuId(), description: "", photo: undefined, urlPhoto: ""};
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
    console.log(this.edition);
    if(this.edition){
      this.indexDbService.editObservation(this.observation).then(c=>console.log('editado ',c));
      this.edition = false;
    }else{
      this.indexDbService.addObservation(this.observation).then(c=>console.log('agregado ',c));
    }
    
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
