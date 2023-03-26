import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailActivityDevelopedPageRoutingModule } from './detail-activity-developed-routing.module';

import { DetailActivityDevelopedPage } from './detail-activity-developed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailActivityDevelopedPageRoutingModule
  ],
  declarations: [DetailActivityDevelopedPage]
})
export class DetailActivityDevelopedPageModule {}
