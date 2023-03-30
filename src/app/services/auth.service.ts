import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  user: any = null;

  constructor(private http: HttpClient) { }

  async signIn(){
    this.user = await GoogleAuth.signIn();
    let idToken = this.user.authentication.idToken;
    localStorage.setItem('token', idToken);
    let clm =  btoa(this.user.email);
    localStorage.setItem('clm', clm);
  }



  // validar(idToken: string):Observable<any>{
  //   const token = {
  //     idToken
  //   }
  //   return this.http.post(`${environment.url}/auth/validar`,token);
  // }

  get getUserName(){
    if(this.isLogued){
      let user = localStorage.getItem('user');
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




  async refresh(){
    const authCode = await GoogleAuth.refresh();
    console.log('refresh ',authCode);
  }

  async logout(){
    await GoogleAuth.signOut();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    this.user = null;
  }


}
