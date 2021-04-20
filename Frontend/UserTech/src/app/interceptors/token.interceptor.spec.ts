import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HEADER_FREE_REQUESTS } from '../constants/headers';
import { LoginService } from '../services/login.service';

import { TokenInterceptor } from './token.interceptor';
let login: jasmine.SpyObj<LoginService>;
let interceptor: TokenInterceptor;

describe('TokenInterceptor', () => {
  beforeEach(() =>{ 
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['setAuthenticateHeader', 'isLoggedIn'])
    TestBed.configureTestingModule({
        providers: [
        TokenInterceptor,
        {provide: LoginService, useValue: loginServiceSpy}
        ]
    });
    login = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    interceptor = TestBed.inject(TokenInterceptor);
    login.setAuthenticateHeader.and.callFake((headers: HttpHeaders = new HttpHeaders())=>{
        headers = headers.set('Authorization', 'token');
        return headers;
    })
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
  it('should add token to header if user logged in', ()=>{
    login.isLoggedIn.and.returnValue(true);
    const request = new HttpRequest("GET", 'someUrl');
    const handler = {
        handle(request: HttpRequest<unknown>){
            expect(request.headers.get('Authorization')).toEqual('token');
            return of<HttpEvent<any>>();
        }
    }
    interceptor.intercept(request, handler);
  });
  it('should not add token to header if user not logged in', ()=>{
    login.isLoggedIn.and.returnValue(false);
    const request = new HttpRequest("GET", 'someUrl');
    const handler = {
        handle(request: HttpRequest<unknown>){
            expect(request.headers.get('Authorization')).toBeFalsy();
            return of<HttpEvent<any>>();
        }
    }
    interceptor.intercept(request, handler);
  });
  it('should not add token if request in #HEADER_FREE_REQUESTS', ()=>{
    login.isLoggedIn.and.returnValue(true);
    const request = new HttpRequest("POST" as any, '/api/login');
    const handler = {
        handle(request: HttpRequest<unknown>){
            expect(request.headers.get('Authorization')).toBeFalsy();
            return of<HttpEvent<any>>();
        }
    }
    interceptor.intercept(request, handler);
  })
});
