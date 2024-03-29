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


  private climCurrent: ClimateCurrent = {
    loadCoords : false,
    todayDate : new Date,
    loadClimaActual: false,
    descripcionClima : [],
    descripcionActual : '',
    loadDescripcion: false,
    urlIconClima : '',
    coordenadas : [0,0]
  };

  public clicked: boolean = false;


  constructor(private router: Router, private authService: AuthService,
    private menuCtrl: MenuController, private climaService: ClimaService) { }

  async ngOnInit() {
 
    const geoLocation = new Geolocation();
    geoLocation.getCurrentPosition().then(geolocation => {
      this.climCurrent.todayDate =  new Date;
      this.climCurrent.todayDate.toLocaleString('es-Ar');
      this.climCurrent.coordenadas[0] = geolocation.coords.latitude;
      this.climCurrent.coordenadas[1] = geolocation.coords.longitude;
      console.log(this.climCurrent.coordenadas);
      this.climCurrent.loadCoords = true;
      this.consultaClima();
    }).catch(e => console.error(e));
  }


  consultaClima() {
    this.climaService.getData(this.climCurrent.coordenadas[0], this.climCurrent.coordenadas[1]).subscribe(async (result) => {
      // manejar resultado exitoso
      //await this.presentAlert('Enviado','Enviado a base de datos','El registro se envió a la base de datos remota');

      this.climCurrent.climaActual = result;
      this.climCurrent.descripcionClima = result.weather;
      this.climCurrent.descripcionActual = this.climCurrent.descripcionClima[0].description;
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

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.menuCtrl.close();
  }

  info() {
    this.clicked = !this.clicked;
    this.router.navigateByUrl('/info');
    this.menuCtrl.close();
    this.clicked = !this.clicked;
  }


  project() {
    this.clicked = !this.clicked;
    this.router.navigateByUrl('/project');
    this.menuCtrl.close();
    this.clicked = !this.clicked;
  }

 

}
