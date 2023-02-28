import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Coordenada } from '../interfaces/coordenadas.interface';
import { Weather } from '../interfaces/temp.interface';


const apiKey = environment.apiKey;
//const URL = 'https://api.openweathermap.org/data/2.5';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  constructor(private http: HttpClient) { }

  getData(lat:number,long:number){
    //http://192.168.1.7:5240/pruebas/clima/lat/-34.8870474/longitud/-57.8736141
    return this.http.get<Weather>(`${URL}/pruebas/clima/lat/${lat}/longitud/${long}`)
  }



}
