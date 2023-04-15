import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { environment } from '../../environments/environment.prod';


//const urlApi = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StuffService {




  constructor(@Inject('API_URL') private urlApi: string,private http: HttpClient) { }





  getWorkers(){
    return this.http.get<User[]>(`${this.urlApi}/users/getworkers`);
  }

  
  getMeActivities(userId: string, projectId: number){
    return  this.http.get<any>(`${this.urlApi}/users/assigned_activities/${userId}/${projectId}`);
  }

}
