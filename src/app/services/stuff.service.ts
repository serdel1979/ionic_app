import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { environment } from '../../environments/environment.prod';


const urlLocal = environment.url;
const urlApi = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StuffService {




  constructor(private http: HttpClient) { }





  getWorkers(){
    return this.http.get<User[]>(`${urlLocal}/users/getworkers`);
  }

  
  getMeActivities(userId: string, projectId: number){
    return  this.http.get<any>(`${urlLocal}/users/assigned_activities/${userId}/${projectId}`);
  }

}
