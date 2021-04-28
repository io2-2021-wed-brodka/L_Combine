import { TestBed } from '@angular/core/testing';
import { convertToParamMap, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

import { UserLoggedGuard } from './user-logged.guard';

describe('UserLoggedGuard', () => {
  let guard: UserLoggedGuard;
  let router: jasmine.SpyObj<Router>;
  let login: jasmine.SpyObj<LoginService>;

  let routeSnapshotMock: any = {paramMap: convertToParamMap({})};
  let routeStateSnapshotMock: any =  {paramMap: convertToParamMap({})};
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    const loginSpy = jasmine.createSpyObj('LoginService', ['isLoggedIn']);
 
    TestBed.configureTestingModule({
        providers:[
            {provide: Router, useValue: routerSpy},
            {provide: LoginService, useValue: loginSpy}
        ]
    });
    guard = TestBed.inject(UserLoggedGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    login = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('#canActivate should return true if user is logged in', ()=>{
    login.isLoggedIn.and.returnValue(true);
    const result = guard.canActivate(routeSnapshotMock, routeStateSnapshotMock);
    expect(result as boolean).toBeTrue();
  });
  
  it('#canActivate should redirect router to login view if user is not logged in', ()=>{
    login.isLoggedIn.and.returnValue(false);
    expect(router.parseUrl).toHaveBeenCalledTimes(0);
    guard.canActivate(routeSnapshotMock, routeStateSnapshotMock);
    expect(router.parseUrl).toHaveBeenCalledOnceWith('/login')
  });
});
