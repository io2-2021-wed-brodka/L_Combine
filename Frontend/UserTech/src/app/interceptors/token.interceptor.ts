import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';
import {HEADER_FREE_REQUESTS} from '../constants/header-free-requests';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.loginService.isLoggedIn() && !HEADER_FREE_REQUESTS.find(
        tokenFreeReq => tokenFreeReq.urlTest.test(request.url) &&
          request.method === tokenFreeReq.method
      )) {
      console.log('add token to ', request);
      request = request.clone({
        headers: this.loginService.setAuthenticateHeader(request.headers)
      });
    }
    return next.handle(request);
  }
}
