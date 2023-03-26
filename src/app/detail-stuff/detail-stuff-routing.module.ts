import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailStuffPage } from './detail-stuff.page';

const routes: Routes = [
  {
    path: '',
    component: DetailStuffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailStuffPageRoutingModule {}
