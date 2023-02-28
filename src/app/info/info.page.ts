import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Coordenada } from '../interfaces/coordenadas.interface';
import { Weather, WeatherElement } from '../interfaces/temp.interface';
import { ClimaService } from '../services/clima.service';





@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {


  public loadCoords: boolean = false;
  public todayDate = new Date();
  public climaActual!: Weather;
  public loadClimaActual: boolean = false;
  public descripcionClima!: WeatherElement[];
  public descripcionActual : string = '';
  public loadDescripcion : boolean = false;
  public urlIconClima: string = '';

  public coordenadas: [number, number] = [0, 0];


  constructor(private platform: Platform,private clima: ClimaService) {
    this.platform.ready().then(() => console.log('iniciado')).catch(e => { console.error(e) });
  }

  async ngOnInit() {
    this.todayDate.toLocaleString('es-Ar');
    const geoLocation = new Geolocation();
    geoLocation.getCurrentPosition().then(geolocation => {
      console.log(geolocation.coords.latitude);
      this.coordenadas[0] = geolocation.coords.latitude;
      this.coordenadas[1] = geolocation.coords.longitude;
      console.log(this.coordenadas);
      this.loadCoords = true;
      this.consultaClima();
    }).catch(e => console.error(e));
  }



  consultaClima(){
    this.clima.getData(this.coordenadas[0],this.coordenadas[1]).subscribe(async (result) => {
      // manejar resultado exitoso
      //await this.presentAlert('Enviado','Enviado a base de datos','El registro se envió a la base de datos remota');
      console.log(result);
      this.climaActual = result;
      this.descripcionClima = result.weather;
      this.descripcionActual=this.descripcionClima[0].description;
      this.loadDescripcion = true;
      this.urlIconClima = `http://openweathermap.org/img/wn/${this.descripcionClima[0].icon}@4x.png`;
      this.loadClimaActual = true;
    },
    async (error) => {
      // manejar error
      console.error(error);
      //await this.presentAlert('Error','Error al enviar',error.message);
    });
  }

}
