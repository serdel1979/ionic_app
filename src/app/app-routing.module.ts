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
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[LoginGuard]
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule),
    canActivate:[LoginGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
