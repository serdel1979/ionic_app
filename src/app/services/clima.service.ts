import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Coordenada } from '../interfaces/coordenadas.interface';
import { Weather } from '../interfaces/temp.interface';



//const urlApi = environment.api;
const urlApi = 'https://localhost:7071/climate';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  constructor(private http: HttpClient) { }

  getData(lat:number,long:number){
    return this.http.get<Weather>(`${urlApi}/${lat}/${long}`);
  }



}
