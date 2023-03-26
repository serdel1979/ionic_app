import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailActivityDevelopedPage } from './detail-activity-developed.page';

const routes: Routes = [
  {
    path: '',
    component: DetailActivityDevelopedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailActivityDevelopedPageRoutingModule {}
