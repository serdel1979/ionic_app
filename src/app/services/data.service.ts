import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { File, RegistroDTO } from '../interfaces/registro.interface';
import { Developed_activity, Stuff, Activities_to_develop, NeedNextDay, Observation } from '../interfaces/reg.interface';


const urlLocal = environment.url;
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
    userId: string,
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
    let observ: any[]=[];
    for(let obs of observations){
      let phots: any[]=[];
      for(let ph of obs.photos){
        phots.push({
          Description: ph.description,
          ObservationId: 1,
          image: ph.urlPhoto
        })
      }
      observ.push({
        photos: phots,
        Description: obs.description,
        Report_detailId: 1,
      })
    }
    let body={
      "projectId": idProject,
      "UserId": userId,
      "detail": detail,
      "Activities_developed": activity_developed,
      "Activity_to_Dev": act_to_developed,
      "Need_next_day":need_next_day,
      "Observations": observ,
      "reported":"Estos fueron los trabajadores" 
    }
    return this.http.post<any>(`${urlLocal}/project/report`,body);
  }

  confirmStaff(stuffs: Stuff[],
    idProject: number, userId: number){

    let staff : any[] = [];
    for(let stuff of stuffs){
      let act = []
      for(let activity of stuff.activities){
        act.push({
          description: activity.description
        })
      }
      staff.push({
        userId: stuff.id,
        activities: act
      })
    }
    
    let body={
      "projectId": idProject,
      "userId": userId,
      "Staff": staff 
    }
    return this.http.post<any>(`${urlLocal}/project/confirmstaff`,body);
  }

  async enviarDatos(data: RegistroDTO):Promise<Observable<any>>{
    const formData = this.ConstruirFormData(data); 
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
