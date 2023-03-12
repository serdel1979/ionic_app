import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadObservationsPage } from './load-observations.page';

const routes: Routes = [
  {
    path: '',
    component: LoadObservationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadObservationsPageRoutingModule {}
