import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { Observation, TPhoto } from '../interfaces/reg.interface';


const base64 = 'data:image/png;base64,';

@Component({
  selector: 'app-load-observations',
  templateUrl: './load-observations.page.html',
  styleUrls: ['./load-observations.page.scss'],
})
export class LoadObservationsPage{


  name: string = '';
  description: string = '';

  public observation: Observation = {id: 1, description: "", photos: []};

  public photo: TPhoto = {id:1, description: "", photo: undefined};

  public load: boolean = false;
  public src: string | ArrayBuffer | null = '';
  public imgBlobBase64: any = '';

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async cargaImg(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });
    console.log(image);
    if (image.base64String != undefined) {
      let blob = new Blob([image.base64String], { type: 'image/png' });
      this.src = `${base64}${image.base64String}`;
      console.log(blob);
      console.log(this.photo);
      this.photo.photo = blob;
      this.photo.id = this.observation.photos.length;
      this.load = true;
    }
  }

  addPhoto(){
    this.observation.photos.push(this.photo);
    console.log(this.observation);
    this.photo = {id:this.observation.photos.length, description: "", photo: undefined};
    this.load = false;
  }

  confirm() {
    if(!this.load){
      console.log("acá puedo validar datos antes de guardar en bd")
      return;
    }
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
