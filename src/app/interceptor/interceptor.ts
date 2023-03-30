import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    let token = localStorage.getItem('token');
    let clm = localStorage.getItem('clm');
    let clmr = localStorage.getItem('clmr');
    let req = request;
    if(token){
        req = request.clone({
          setHeaders: {"x-google-token":`${token}`,"clm":`${clm}`,"clmr":`${clmr}`}
        });
    }   
    console.log(req);
    return next.handle(req);
  }
}