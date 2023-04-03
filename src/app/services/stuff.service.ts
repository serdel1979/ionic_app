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
      "email" : "splbsso@gmail.com",
      "name" : "Sergio",
      "surname" : "De Luca",
      "dni" : 28154011,
      "responsability" : "Especiealista" ,
      "leader" : false
    },
    {
      "email" : "pablin@gmail.com",
      "name" : "Pablo",
      "surname" : "Armenio",
      "dni" : 27158881,
      "responsability" : "Especialista" ,
      "leader" : false
    },
    {
      "email" : "lalo@gmail.com",
      "name" : "Luciano",
      "surname" : "Pantaleon",
      "dni" : 27154112,
      "responsability" : "Ayudante",
      "leader" : false
    },
    {
      "email" : "lacho@gmail.com",
      "name" : "Leandro",
      "surname" : "Mongue",
      "dni" : 27154112,
      "responsability" : "Instalador",
      "leader" : false
    },
    {
      "email" : "luci@gmail.com",
      "name" : "Lucia",
      "surname" : "Lacaña",
      "dni" : 27154112,
      "responsability" : "Montador",
      "leader" : false
    },
    {
      "email" : "lion@gmail.com",
      "name" : "Lio",
      "surname" : "Costacurta",
      "dni" : 27154112,
      "responsability" : "Especialista",
      "leader" : false
    },
    {
      "email" : "sandro@gmail.com",
      "name" : "Sandro",
      "surname" : "Paoblosqui",
      "dni" : 27154112,
      "responsability" : "Montador",
      "leader" : false
    },
    {
      "email" : "papalala@gmail.com",
      "name" : "Pablo",
      "surname" : "Lucio",
      "dni" : 27154112,
      "responsability" : "Montador",
      "leader" : false
    },
    {
      "email" : "leonor@gmail.com",
      "name" : "Leonor",
      "surname" : "Orosco",
      "dni" : 27154112,
      "responsability" : "Ayudante",
      "leader" : false
    }
  ]


  constructor(private http: HttpClient) { }



  getUsers():User[]{
    //return this.http.get<User[]>(FAKEAPI);
    return this.users;
  }



  
  getWorkers(){
    return this.http.get<User[]>('https://localhost:7071/users/getworkers');
  }

}
