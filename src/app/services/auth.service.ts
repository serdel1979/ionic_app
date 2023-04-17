import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

  
//const urlApi = 'https://apiapp-production.up.railway.app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {




  user: any = null;

  dataProject: any = null;

  constructor(private http: HttpClient, @Inject('API_URL') private urlApi: string) { }

  async signIn(){
    this.user = await GoogleAuth.signIn();
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
    return this.http.post<any>(`${this.urlApi}/users/signin`,body);
  }
  

  

  doAdmin(){
    let body={
      Email : 'sdlbsso@gmail.com' 
    }
    return this.http.post<any>(`${this.urlApi}/users/doadmin`,body);
  }

  deleteAdmin(){
    let body={
      Email : 'sdlbsso@gmail.com' 
    }
    return this.http.post<any>(`${this.urlApi}/users/deleteadmin`,body);
  }

  get getProject(){
    return this.dataProject;
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
    // if(token != null){
    //   let exp = this.getExpireToken();
    //   let fechaExpira = new Date(exp * 1000);
    //   let currentDate = new Date();
    //   if (currentDate > fechaExpira) return false;
    // }
    return token != null;
  }

  get isAdmin(){
   let token = localStorage.getItem('token');
   if(!token)token='';
   let deco = this.getDecodedAccessToken(token);
   if(!deco || !deco.esAdmin)return false
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

  getId(){
    let token = localStorage.getItem('token');
    let jwt:any;
    if(token){
      jwt = jwt_decode(token);
    }
    return jwt.user;  
  }

  getExpireToken(){
    let token = localStorage.getItem('token');
    let jwt:any;
    if(token){
      jwt = jwt_decode(token);
    }
    return jwt.exp;  
  }

  async refresh(){
    await GoogleAuth.refresh().then((r)=>{
      console.log(r);
    }); 
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
