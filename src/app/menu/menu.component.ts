import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ClimateCurrent } from '../interfaces/temp.interface';
import { AuthService } from '../services/auth.service';
import { ClimaService } from '../services/clima.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  private climCurrent!: ClimateCurrent;

  constructor(private router: Router, private authService: AuthService,
    private menuCtrl: MenuController, private climaService: ClimaService) { }

  async ngOnInit() {
    this.climCurrent.todayDate.toLocaleString('es-Ar');
    const geoLocation = new Geolocation();
    geoLocation.getCurrentPosition().then(geolocation => {
      console.log(geolocation.coords.latitude);
      this.climCurrent.coordenadas[0] = geolocation.coords.latitude;
      this.climCurrent.coordenadas[1] = geolocation.coords.longitude;
      console.log(this.climCurrent.coordenadas);
      this.climCurrent.loadCoords = true;
      this.consultaClima();
    }).catch(e => console.error(e));
  }


  consultaClima(){
    this.climaService.getData(this.climCurrent.coordenadas[0],this.climCurrent.coordenadas[1]).subscribe(async (result) => {
      // manejar resultado exitoso
      //await this.presentAlert('Enviado','Enviado a base de datos','El registro se envió a la base de datos remota');
      console.log(result);
      this.climCurrent.climaActual = result;
      this.climCurrent.descripcionClima = result.weather;
      this.climCurrent.descripcionActual=this.climCurrent.descripcionClima[0].description;
      this.climCurrent.loadDescripcion = true;
      this.climCurrent.urlIconClima = `http://openweathermap.org/img/wn/${this.climCurrent.descripcionClima[0].icon}@4x.png`;
      this.climCurrent.loadClimaActual = true;
    },
    async (error) => {
      // manejar error
      console.error(error);
      //await this.presentAlert('Error','Error al enviar',error.message);
    });
  }

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

  project(){
    this.router.navigateByUrl('/project');
    this.menuCtrl.close();
  }

}
