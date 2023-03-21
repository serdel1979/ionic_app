import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadStuffPage } from './load-stuff.page';

const routes: Routes = [
  {
    path: '',
    component: LoadStuffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadStuffPageRoutingModule {}
