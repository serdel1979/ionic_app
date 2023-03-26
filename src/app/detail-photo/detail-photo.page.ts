import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TPhoto } from '../interfaces/reg.interface';

@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.page.html',
  styleUrls: ['./detail-photo.page.scss'],
})
export class DetailPhotoPage{



  public description: string = '';
  public photo!: TPhoto;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams) { }

  ionViewWillEnter() {
    this.description = this.navParams.get('description');
    this.photo = this.navParams.get('photo');
  }


  confirm() {
    return this.modalCtrl.dismiss('return', 'return');
  }

}
