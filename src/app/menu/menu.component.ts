import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService,
    private menuCtrl: MenuController) { }

  ngOnInit() {}


  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
    console.log("logout");
    this.menuCtrl.close();
  }

  info(){
    this.router.navigateByUrl('/info');
    this.menuCtrl.close();
  }

  home(){
    this.router.navigateByUrl('/home');
    this.menuCtrl.close();
  }

}
