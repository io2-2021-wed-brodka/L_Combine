import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

const headerFreeRequests = [
  {
    urlTest: /\/api\/login$/,
    method: 'POST'
  }
];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.loginService.isLoggedIn() && 
      !headerFreeRequests.find(tokenFreeReq=> tokenFreeReq.urlTest.test(request.url) && request.method==tokenFreeReq.method)){

      console.log('add token to ', request);
      request = request.clone({
        headers: this.loginService.setAuthenticateHeader(request.headers)
      })
    }
    return next.handle(request);
  }
}
