import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("INTERCEPTING")
    console.log(req);
    let tokenizedReq = req.clone({
      setHeaders: {
        "Access-Control-Allow-Origin" : "origin-list",
        Authorization: `${this.authService.getAuthToken()}`
      }
    })
    return next.handle(tokenizedReq)
    throw new Error('Method not implemented.');
  }
}
