import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Stuff } from '../interfaces/reg.interface';

@Component({
  selector: 'app-detail-stuff',
  templateUrl: './detail-stuff.page.html',
  styleUrls: ['./detail-stuff.page.scss'],
})
export class DetailStuffPage {


  public stuff!: Stuff;


  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams) { }

    ionViewWillEnter() {
      this.stuff = this.navParams.get('stuff');
    }


    confirm() {
      return this.modalCtrl.dismiss('return', 'return');
    }

}
