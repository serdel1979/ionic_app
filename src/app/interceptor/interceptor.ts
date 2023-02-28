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
    let req = request;
    if(token){
        req = request.clone({
          setHeaders: {"x-google-token":`${token}`}
          //setHeaders: {"x-google-token":`asd1321asdasd321`}
        });
    }   
    console.log(req);
    return next.handle(req);
  }
}