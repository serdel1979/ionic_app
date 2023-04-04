import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';
import { environment } from '../../environments/environment.prod';


const FAKEAPI = "http://localhost:3000/users";
const urlApi = environment.api;

@Injectable({
  providedIn: 'root'
})
export class StuffService {




  constructor(private http: HttpClient) { }





  
  getWorkers(){
    return this.http.get<User[]>(`${urlApi}/users/getworkers`);
  }

}
