import {HttpErrorResponse, HttpHandler, HttpRequest} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {throwError} from 'rxjs';
import {IGNORE_ERROR_INTERCEPT} from '../constants/headers';
import {NotificationService} from '../services/notification.service';
import {RedirectService} from '../services/redirect.service';

import {HttpErrorInterceptor} from './http-error.interceptor';
import {Router} from '@angular/router';
import Spy = jasmine.Spy;


describe('HttpErrorInterceptor', () => {
  // funkcja do sprawdzania reakcji interceptora na dany status
  function checkFunctionCallOnStatus(spyFun: Function, status: number): void {
    expect(spyFun).toHaveBeenCalledTimes(0);
    const next: HttpHandler = {
      handle(_: HttpRequest<unknown>): any {
        return throwError(new HttpErrorResponse({
          status,
          error: {
            message: 'message'
          }
        }));
      }
    };
    interceptor.intercept(request, next).subscribe(() => {}, () => {});
    expect(spyFun).toHaveBeenCalledTimes(1);
  }

  let notification: jasmine.SpyObj<NotificationService>;
  let redirect: jasmine.SpyObj<RedirectService>;
  let router: jasmine.SpyObj<Router>;
  let request: HttpRequest<unknown>;
  let interceptor: HttpErrorInterceptor;

  beforeEach(() => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['error']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['redirectToLogin', 'redirectToHome']);
    const routerSpy = jasmine.createSpyObj('Router', [], {url: 'someUrl'});

    TestBed.configureTestingModule({
      providers: [
        HttpErrorInterceptor,
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: RedirectService, useValue: redirectServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    });
    notification = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirect = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    request = new HttpRequest('GET', 'someUrl');
    interceptor = TestBed.inject(HttpErrorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should redirect to login view on 401 error', () => {
    checkFunctionCallOnStatus(redirect.redirectToLogin, 401);
  });

  it('should redirect to home view on 404 error', () => {
    checkFunctionCallOnStatus(redirect.redirectToHome, 404);
  });

  it('should redirect to home view on 406 error', () => {
    checkFunctionCallOnStatus(redirect.redirectToHome, 406);
  });

  it('should redirect to home view on 403 error', () => {
    checkFunctionCallOnStatus(redirect.redirectToHome, 403);
  });

  it('should redirect to home view on 422 error', () => {
    checkFunctionCallOnStatus(redirect.redirectToHome, 422);
  });

  it('should send notification with error message on 422 error', () => {
    checkFunctionCallOnStatus(notification.error, 422);
    expect(notification.error).toHaveBeenCalledOnceWith('message');
  });

  it('should send notification with error message on 403 error', () => {
    checkFunctionCallOnStatus(notification.error, 403);
    expect(notification.error).toHaveBeenCalledOnceWith('message');
  });

  it('should send notification with error message on 406 error', () => {
    checkFunctionCallOnStatus(notification.error, 406);
    expect(notification.error).toHaveBeenCalledOnceWith('message');
  });

  it('should send notification on unknown error', () => {
    checkFunctionCallOnStatus(notification.error, -1);
  });

  it('should not redirect or send notification if response has #IGNORE_ERROR_INTERCEPT header', () => {
    request = request.clone({
      headers: request.headers.set(IGNORE_ERROR_INTERCEPT, '')
    });
    const next: HttpHandler = {
      handle(_: HttpRequest<unknown>): any {
        return throwError(new HttpErrorResponse({
          status: 404
        }));
      }
    };
    interceptor.intercept(request, next).subscribe(() => {}, () => {});
    expect(notification.error).toHaveBeenCalledTimes(0);
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
    expect(redirect.redirectToLogin).toHaveBeenCalledTimes(0);
  });

  it('should not redirect on 422 if path matches constant', () => {
    (Object.getOwnPropertyDescriptor(router, 'url')?.get as Spy<() => string>).and.returnValue('/rental/return/3');
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
    const next: HttpHandler = {
      handle(_: HttpRequest<unknown>): any {
        return throwError(new HttpErrorResponse({
          status: 422,
          error: {
            message: 'message'
          }
        }));
      }
    };
    interceptor.intercept(request, next).subscribe(() => {}, () => {});
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
  });
});
