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
    let tokeng = localStorage.getItem('token-g');
    let req = request;
  
    req = request.clone({
          setHeaders: {"x-google-token":`${tokeng}`,"Authorization":`Bearer ${token}`}
    });
       
    return next.handle(req);
  }
}