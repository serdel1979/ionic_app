import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

  
const urlUser = 'https://localhost:7071';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  user: any = null;

  constructor(private http: HttpClient) { }

  async signIn(){
    this.user = await GoogleAuth.signIn();
    console.log(this.user);
    let idToken = this.user.authentication.idToken;
    if(this.user){
      if(this.user.email){
        localStorage.setItem('user-log',this.user.email);
      }
    }
   
    localStorage.setItem('token-g', idToken);
  }



  getData(email:string){
    let body={
      email 
    }
    return this.http.post<any>(`${urlUser}/users/signin`,body);
  }
  

  getUser(){
    return this.http.get<any>(`${urlUser}/users/getuser/05b3db6f-b14c-472d-90e7-97f29699c485`);
  }

  doAdmin(){
    let body={
      Email : 'sdlbsso@gmail.com' 
    }
    return this.http.post<any>(`${urlUser}/users/doadmin`,body);
  }

  deleteAdmin(){
    let body={
      Email : 'sdlbsso@gmail.com' 
    }
    return this.http.post<any>(`${urlUser}/users/deleteadmin`,body);
  }

  get getUserName(){
    if(this.isLogued){
      let user = localStorage.getItem('user-log');
      if(user){
        return user;
      }
      return "nulo";
    }
    return "nulo";
  }

  get isLogued(){
    let token = localStorage.getItem('token');
    return token != null;
  }

  get isAdmin(){
   let token = localStorage.getItem('token');
   if(!token)token='';
   let deco = this.getDecodedAccessToken(token);
   if(!deco.esAdmin)return false
   else
   return (true);
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  async refresh(){
    const authCode = await GoogleAuth.refresh();
    console.log('refresh ',authCode);
  }

  async logout(){
    await GoogleAuth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('token-g');
    localStorage.removeItem('user-log');
    localStorage.clear();
    this.user = null;
  }


}
