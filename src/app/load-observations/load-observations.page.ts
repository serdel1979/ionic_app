import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { Observation, TPhoto } from '../interfaces/reg.interface';

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
      console.log(blob);
      console.log(this.photo);
      this.photo.photo = blob;
      this.photo.id = this.observation.photos.length;
      this.observation.photos.push(this.photo);
      console.log(this.observation);
    }
  }

  confirm() {
    console.log("confirmado")
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
