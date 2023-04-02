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
    this.authService.signIn().then(()=>{
      this.showLoading();
      let usrlog = localStorage.getItem('user-log');
      if(!usrlog)usrlog='';
      this.authService.getData(usrlog).subscribe((resp)=>{  
        this.indexDB.addProject(resp.project).then(p=>{
          console.log(`projecto guardado ${p}`);
        })
        localStorage.setItem('token', resp.token);
        this.loadingCtl.dismiss();
        this.router.navigateByUrl('/project');
      },
        ( error)=>{
        this.loadingCtl.dismiss();
        localStorage.removeItem('token-g');
        localStorage.removeItem('user-log');
        this.seeError(error.error);
      })
    }).catch((err)=>{
      localStorage.removeItem('token-g');
      localStorage.removeItem('user-log');
      this.loadingCtl.dismiss();
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
