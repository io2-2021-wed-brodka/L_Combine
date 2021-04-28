import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {RedirectService} from '../services/redirect.service';
import {IGNORE_ERROR_INTERCEPT} from '../constants/headers';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService,
              private redirectService: RedirectService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has(IGNORE_ERROR_INTERCEPT)) {
      return next.handle(request.clone({headers: request.headers.delete(IGNORE_ERROR_INTERCEPT)}));
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 401:
        this.redirectService.redirectToLogin();
        break;
      case 404:
        this.redirectService.redirectToHome();
        break;
      case 406:
      case 422:
        this.notificationService.error(error.error?.message);
        // this.redirectService.reload();
        break;
      default:
        this.notificationService.error('Unexpected error occurred. Try again later.');
    }
  }
}

