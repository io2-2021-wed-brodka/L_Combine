import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginService} from '../services/login.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage;
          let returnedError;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            returnedError = error.error;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            returnedError = error;

            // logout user if response is 401
            if (error.status === 401) {
              this.loginService.logout();
            }
          }
          console.error(errorMessage);
          // TODO: dodałbym komponent, który wyświetla jakąś wiadomość gdy wystąpi error na górze strony
          // chciałbym uniknąć jawnego sprawdzania błędów kiedy nie jest to wymagane
          return throwError(returnedError);
        })
      );
  }
}
