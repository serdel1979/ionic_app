import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File, RegistroDTO } from '../interfaces/registro.interface';
import { Developed_activity, Stuff, Activities_to_develop, NeedNextDay, Observation } from '../interfaces/reg.interface';



//const LAN = 'http://localhost:5240/pruebas';
const urlApi = environment.api;


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }



  sendReport(stuffs: Stuff[], 
    act_developed: Developed_activity[],
    observations: Observation[],
    act_to_dev: Activities_to_develop[],
    needs: NeedNextDay[],
    idProject: number){

    let detail : any[] = [];
    for(let stuff of stuffs){
      detail.push({
        description: "a description",
        userId: stuff.id,
        reportId: 1,
        entry_time: stuff.entry_time,
        departure_time: stuff.departure_time
      })
    }
    let activity_developed : any[] = [];
    for(let actdev of act_developed){
      activity_developed.push({
        Description: actdev.description
      })
    }
    let act_to_developed: any[]=[];
    for(let acttodev of act_to_dev){
      act_to_developed.push({
        Description: acttodev.description
      })
    }
    let need_next_day: any[]=[];
    for(let need of needs){
      need_next_day.push({
        Description: need.description
      })
    }
    let body={
      "projectId": idProject,
      "detail": detail,
      "Activities_developed": activity_developed,
      "Activity_to_Dev": act_to_developed,
      "Need_next_day":need_next_day,
      "report":"Estos fueron los trabajadores" 
    }
    console.log('Observations: ',observations);
    return this.http.post<any>(`https://localhost:7071/project/report`,body);
  }


  async enviarDatos(data: RegistroDTO):Promise<Observable<any>>{
    const formData = this.ConstruirFormData(data); 
    console.log('Enviando datos ->',data);
    return await this.http.post<any>(`${urlApi}/pruebas`,formData);
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
