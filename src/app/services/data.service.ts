import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File, RegistroDTO } from '../interfaces/registro.interface';



//const LAN = 'http://localhost:5240/pruebas';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string = environment.url;

  constructor(private http: HttpClient) { }


  async enviarDatos(data: RegistroDTO):Promise<Observable<any>>{
    const formData = this.ConstruirFormData(data); 
    console.log('Enviando datos ->',data);
    return await this.http.post<any>(`${this.url}/pruebas`,formData);
  }


  private ConstruirFormData(registroFoto: RegistroDTO): FormData {
    const formData =  new FormData();

    formData.append('Latitud', JSON.stringify(registroFoto.Latitud));
    formData.append('Longitud', JSON.stringify(registroFoto.Longitude));
    formData.append('UserName', registroFoto.UserName);
    formData.append('Foto', registroFoto.Imagen);

    return formData;
  }

}
