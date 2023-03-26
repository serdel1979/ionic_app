import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then( m => m.ProjectPageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'load-observations',
    loadChildren: () => import('./load-observations/load-observations.module').then( m => m.LoadObservationsPageModule)
  },  {
    path: 'detail-photo',
    loadChildren: () => import('./detail-photo/detail-photo.module').then( m => m.DetailPhotoPageModule)
  },
  {
    path: 'load-stuff',
    loadChildren: () => import('./load-stuff/load-stuff.module').then( m => m.LoadStuffPageModule)
  },
  {
    path: 'detail-stuff',
    loadChildren: () => import('./detail-stuff/detail-stuff.module').then( m => m.DetailStuffPageModule)
  },
  {
    path: 'detail-activity-developed',
    loadChildren: () => import('./detail-activity-developed/detail-activity-developed.module').then( m => m.DetailActivityDevelopedPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
