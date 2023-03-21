import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { Storage } from '@ionic/storage-angular';


const NEED_KEYS = 'my-needs';
const STUFF_KEYS = 'my-stuffs';
const ACT_DEV_KEYS = 'my-activity-dev';
const ACT_TO_DEV_KEYS = 'my-activity-to-dev';
const OBSERVATIONS_KEYS = 'my-observations';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private storage: Storage) {}



  async ngOnInit(): Promise<void> {
    await this.storage.create();
    await this.storage.set(NEED_KEYS,[]);
    await this.storage.set(STUFF_KEYS,[]);
    await this.storage.set(ACT_DEV_KEYS,[]);
    await this.storage.set(ACT_TO_DEV_KEYS,[]);
    await this.storage.set(OBSERVATIONS_KEYS,[]);
  }


}
