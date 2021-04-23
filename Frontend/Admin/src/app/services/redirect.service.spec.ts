import {fakeAsync, TestBed} from '@angular/core/testing';

import {RedirectService} from './redirect.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

describe('RedirectService', () => {
  let service: RedirectService;
  let router: jasmine.SpyObj<Router>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'], {url: '/test'});
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: routerSpy
        }, {
          provide: Location,
          useValue: locationSpy
        }
      ]
    });
    service = TestBed.inject(RedirectService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

    router.navigateByUrl.and.returnValue(Promise.resolve(true));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#redirectToHome should call router.navigate with "home"', () => {
    service.redirectToHome();
    expect(router.navigate).toHaveBeenCalledOnceWith(['rental/home']);
  });

  it('#redirectToLogin should call router.navigate with "login"', () => {
    service.redirectToLogin();
    expect(router.navigate).toHaveBeenCalledOnceWith(['login']);
  });

  it('#goBack should call location.back', () => {
    service.goBack();
    expect(location.back).toHaveBeenCalledTimes(1);
  });

  it('#reload should call router.navigateByUrl and router.navigateByUrl', fakeAsync(() => {
    service.reload().then(() => {
      expect(router.navigateByUrl).toHaveBeenCalledTimes(2);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/rental', {skipLocationChange: true});
      expect(router.navigateByUrl).toHaveBeenCalledWith(router.url);
    });
  }));
});
