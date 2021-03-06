import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { IGNORE_ERROR_INTERCEPT } from '../constants/headers';
import { Role } from '../dto/authenticate-response-dto';

import { LoginService } from './login.service';
import { RedirectService } from './redirect.service';

describe('LoginService', () => {
    let httpTestingControler: HttpTestingController;
    let storage: any;
    let redirect: jasmine.SpyObj<RedirectService>
    beforeEach(() => {
        const redirectServiceSpy = jasmine.createSpyObj('RedirectService',['redirectToLogin'])
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule],
            providers: [
                {provide: RedirectService, useValue: redirectServiceSpy}
            ]
        });
        httpTestingControler = TestBed.inject(HttpTestingController);
        redirect = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;

        storage = {token: null};
        spyOn(localStorage, 'getItem').and
            .callFake((key: string)=>storage[key]);
        spyOn(localStorage, 'removeItem').and
            .callFake((key: string)=>storage[key] = undefined);
        spyOn(localStorage, 'setItem').and
            .callFake((key: string, value)=>storage[key] = value);
    });

    it('should be created', () => {
        const service = TestBed.inject(LoginService);
        expect(service).toBeTruthy();
    });

    it('should be logged out on init',()=>{
        const service = TestBed.inject(LoginService);
        expect(service.isLoggedIn()).toBeFalse();
    });
    
    it('should log in on init if there is token and role in the storage',()=>{
        storage['token'] = 'token';
        storage['role'] = Role.Tech;
        const service = TestBed.inject(LoginService);
        expect(service.isLoggedIn()).toBeTrue();
        expect(service.getRole()).toEqual(Role.Tech);
    });

    it('should not log in on init if only token is in the storage',()=>{
        storage['token'] = 'token';
        const service = TestBed.inject(LoginService);
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('should not log in on init if only role is in the storage',()=>{
        storage['role'] = Role.Tech;
        const service = TestBed.inject(LoginService);
        expect(service.isLoggedIn()).toBeFalse();
        expect(service.getRole()).toBeFalsy();
    });

    it('#logout should make user not logged in', ()=>{
        storage['token'] = 'token';
        storage['role'] = Role.Tech;
        const service = TestBed.inject(LoginService);
        service.logout();
        expect(service.isLoggedIn()).toBeFalse();
    });

    it('#logout should remove token from storage', ()=>{
        storage['token'] = 'token';
        const service = TestBed.inject(LoginService);
        service.logout();
        expect(storage['token']).toBeFalsy();
    });

    it('#logout should remove role from storage', ()=>{
        storage['role'] = Role.Tech;
        const service = TestBed.inject(LoginService);
        service.logout();
        expect(storage['role']).toBeFalsy();
    });

    it('#logout should redirect to login view', ()=>{
        expect(redirect.redirectToLogin).toHaveBeenCalledTimes(0);
        storage['token'] = 'token';
        storage['role'] = Role.Tech;
        const service = TestBed.inject(LoginService);
        service.logout();
        expect(redirect.redirectToLogin).toHaveBeenCalledTimes(1);
    });

    it('#setAuthenticateHeader should add token to header', ()=>{
        storage['token'] = 'token';
        storage['role'] = Role.Tech;
        const service = TestBed.inject(LoginService);
        const headers = service.setAuthenticateHeader();
        expect(headers.get('Authorization')).toEqual('Bearer token');
    });

    it('#login should post login data to server', ()=>{
        const service = TestBed.inject(LoginService);
        const loginData = {
            login: 'login',
            password: 'password'
        }
        service.login(loginData).subscribe(dto=>
            expect(dto.token).toEqual('token'));

        const request = httpTestingControler.expectOne(`${environment.apiUrl}/login`);
        expect(request.request.body).toEqual(loginData);
        request.flush({token: 'token'});
        httpTestingControler.verify();
    });

    it('#login should make user logged in', ()=>{
        const service = TestBed.inject(LoginService);
        const loginData = {
            login: 'login',
            password: 'password'
        }
        service.login(loginData).subscribe();
        const request = httpTestingControler.expectOne(`${environment.apiUrl}/login`);
        request.flush({token: 'token'});
        expect(service.isLoggedIn()).toBeTrue();
    });

    it('#login should save token to localStorage', ()=>{
        const service = TestBed.inject(LoginService);
        const loginData = {
            login: 'login',
            password: 'password'
        }
        service.login(loginData).subscribe();
        const request = httpTestingControler.expectOne(`${environment.apiUrl}/login`);
        request.flush({token: 'token'});
        expect(storage['token']).toEqual('token');
    });
    
    it('#getRole should return null if is not logged in', ()=>{
        const service = TestBed.inject(LoginService);
        expect(service.getRole()).toBeFalsy();
    });
    
    it('#getRole should return logged user role', ()=>{
        const service = TestBed.inject(LoginService);
        const loginData = {
            login: 'login',
            password: 'password'
        }
        service.login(loginData).subscribe();
        const request = httpTestingControler.expectOne(`${environment.apiUrl}/login`);
        request.flush({token: 'token', role: Role.Tech});
        expect(service.getRole()).toEqual(Role.Tech);
    });

    it('#login should save role to localStorage', ()=>{
        const service = TestBed.inject(LoginService);
        const loginData = {
            login: 'login',
            password: 'password'
        }
        service.login(loginData).subscribe();
        const request = httpTestingControler.expectOne(`${environment.apiUrl}/login`);
        request.flush({token: 'token', role: Role.Tech});
        expect(storage['role']).toEqual(Role.Tech);
    });
});
