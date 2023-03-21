import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';


const FAKEAPI = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class StuffService {



  constructor(private http: HttpClient) { }



  getUsers():Observable<User[]>{
    return this.http.get<User[]>(FAKEAPI);
  }


}
