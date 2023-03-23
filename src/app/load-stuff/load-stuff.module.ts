import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadStuffPageRoutingModule } from './load-stuff-routing.module';

import { LoadStuffPage } from './load-stuff.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    LoadStuffPageRoutingModule
  ],
  declarations: [LoadStuffPage]
})
export class LoadStuffPageModule {}
