import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { User } from '../interfaces/users.interface';


const FAKEAPI = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class StuffService {

  private users: User[] = [
    {
      "email" : "sdlbsso@gmail.com",
      "name" : "Sergio",
      "surname" : "De Luca",
      "dni" : 27154111,
      "responsabilityId" : 2 ,
      "leader" : false
    },
    {
      "email" : "pablin@gmail.com",
      "name" : "Pablo",
      "surname" : "Armenio",
      "dni" : 27158881,
      "responsabilityId" : 1 ,
      "leader" : false
    },
    {
      "email" : "lalo@gmail.com",
      "name" : "Luciano",
      "surname" : "Pantalon",
      "dni" : 27154112,
      "responsabilityId" : 2,
      "leader" : false
    },
    {
      "email" : "lacho@gmail.com",
      "name" : "Leandro",
      "surname" : "Monge",
      "dni" : 27154112,
      "responsabilityId" : 2,
      "leader" : false
    },
    {
      "email" : "luci@gmail.com",
      "name" : "Lucia",
      "surname" : "Lacaña",
      "dni" : 27154112,
      "responsabilityId" : 2,
      "leader" : false
    },
    {
      "email" : "lion@gmail.com",
      "name" : "Lio",
      "surname" : "Costacurta",
      "dni" : 27154112,
      "responsabilityId" : 2,
      "leader" : false
    },
    {
      "email" : "sandr@gmail.com",
      "name" : "Sandro",
      "surname" : "Pablosqui",
      "dni" : 27154112,
      "responsabilityId" : 2,
      "leader" : false
    },
    {
      "email" : "papalala@gmail.com",
      "name" : "Pablo",
      "surname" : "Lucio",
      "dni" : 27154112,
      "responsabilityId" : 2,
      "leader" : false
    },
    {
      "email" : "leonoro@gmail.com",
      "name" : "Leonor",
      "surname" : "Orosco",
      "dni" : 27154112,
      "responsabilityId" : 2,
      "leader" : false
    }
  ]


  constructor(private http: HttpClient) { }



  getUsers():User[]{
    //return this.http.get<User[]>(FAKEAPI);
    return this.users;
  }


}
