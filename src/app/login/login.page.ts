import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { AlertController, InfiniteScrollCustomEvent, isPlatform, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { IndexDBService } from '../services/index-db.service';

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
    private menuCtrl: MenuController,
    private indexDB: IndexDBService) {
    if(!isPlatform('capacitor')){
      GoogleAuth.initialize();
    };
    if(this.authService.isLogued){
      this.router.navigateByUrl('/project');
    };
  }




  async signIn(){
    const loading = await this.loadingCtl.create({
      message: 'Verificando acceso...',
    });
    this.authService.signIn().then(async ()=>{
      await loading.present();
      let usrlog = localStorage.getItem('user-log');
      if(!usrlog)usrlog='';
      this.authService.getData(usrlog).subscribe((resp)=>{  
        localStorage.setItem('token', resp.token);
        localStorage.setItem('proj',JSON.stringify(resp.project));
        loading.dismiss();
        this.router.navigateByUrl('/project');
      },
        ( error)=>{
        localStorage.removeItem('token-g');
        localStorage.removeItem('user-log');
        loading.dismiss();
        this.seeError(error.error);
      })
    }).catch((err)=>{
      localStorage.removeItem('token-g');
      localStorage.removeItem('user-log');
      loading.dismiss();
      this.seeError(err.error);
    });
  }


  async seeError(error: string) {
    const alert = await this.alertController.create({
      header: 'Error',
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

  async showLoading() {
    const loading = await this.loadingCtl.create({
      message: 'Verificando acceso...',
    });
    return await loading.present();
  }


}
