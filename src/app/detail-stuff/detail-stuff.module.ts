import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailStuffPageRoutingModule } from './detail-stuff-routing.module';

import { DetailStuffPage } from './detail-stuff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailStuffPageRoutingModule
  ],
  declarations: [DetailStuffPage]
})
export class DetailStuffPageModule {}
