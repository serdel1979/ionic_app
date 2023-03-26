import { Component} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Developed_activity } from '../interfaces/reg.interface';

@Component({
  selector: 'app-detail-activity-developed',
  templateUrl: './detail-activity-developed.page.html',
  styleUrls: ['./detail-activity-developed.page.scss'],
})
export class DetailActivityDevelopedPage{



  public activity!: Developed_activity;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams) { }

  

  
  ionViewWillEnter() {
    this.activity = this.navParams.get('activity');
  }



  confirm() {
    return this.modalCtrl.dismiss('return', 'return');
  }


}
