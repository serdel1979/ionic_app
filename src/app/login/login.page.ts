import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AlertController, InfiniteScrollCustomEvent, isPlatform, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage{

  user: any = null;


  constructor(private loadingCtl: LoadingController, private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private menuCtrl: MenuController) {
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize();
    };
    if(this.authService.isLogued){
      this.router.navigateByUrl('/project');
    };
  }




  async signIn(){
    this.authService.signIn().then(()=>{
      this.router.navigateByUrl('/project');
    }).catch((err)=>{
      this.seeError(err);
    });

  }


  async seeError(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Falla en el login',
      message: error,
      buttons: ['OK'],
    });
    await alert.present();
  }



  logued(){
    return this.authService.isLogued;
  }

  signOut(){
    this.authService.logout();
    this.menuCtrl.close();
  }



}
