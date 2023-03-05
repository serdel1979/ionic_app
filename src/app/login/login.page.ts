import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { InfiniteScrollCustomEvent, isPlatform, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage{

  user: any = null;


  constructor(private loadingCtl: LoadingController, private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController) {
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize();
    };
    if(this.authService.isLogued){
      this.router.navigateByUrl('/home');
    };
  }




  async signIn(){
    this.authService.signIn().then(()=>{
      this.router.navigateByUrl('/project');
    }).catch(()=>{
      console.error("error");
    });

  }



  logued(){
    return this.authService.isLogued;
  }

  signOut(){
    this.authService.logout();
    this.menuCtrl.close();
  }



}
