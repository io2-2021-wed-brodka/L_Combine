import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {of, throwError} from 'rxjs';
import { Role } from 'src/app/dto/authenticate-response-dto';
import {LoginService} from 'src/app/services/login.service';
import {RedirectService} from 'src/app/services/redirect.service';

import {LoginViewComponent} from './login-view.component';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;
  let login: jasmine.SpyObj<LoginService>;
  let redirect: jasmine.SpyObj<RedirectService>;
  beforeEach(async () => {
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['redirectToHome']);
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginViewComponent],
      providers: [
        {provide: RedirectService, useValue: redirectServiceSpy},
        {provide: LoginService, useValue: loginServiceSpy}
      ]
    })
      .compileComponents();
    redirect = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    login = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    login.login.and.callFake(credentials => {
      if (credentials.login === 'wrong') {
        return throwError({});
      } else {
        return of({token: 'token', role: Role.Admin});
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#login should login', () => {
    expect(login.login).toHaveBeenCalledTimes(0);
    component.login();
    expect(login.login).toHaveBeenCalledTimes(1);
  });

  it('#login should redirect home ', () => {
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
    component.login();
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(1);
  });

  it('#login should not redirect if credentials are wrong', () => {
    component.formData.login = 'wrong';
    component.login();
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
  });

  it('#login should not set #showErrorMessage if credentials are correct', () => {
    component.login();
    expect(component.showErrorMessage).toBeFalse();
  });

  it('#login should set #showErrorMessage if credentials are wrong', () => {
    component.formData.login = 'wrong';
    component.login();
    expect(component.showErrorMessage).toBeTrue();
  });

  it('should display error message when #showErrorMessage is true', () => {
    const de = fixture.debugElement;
    expect(de.query(By.css('.form-error'))).toBeFalsy();
    component.showErrorMessage = true;
    fixture.detectChanges();
    expect(de.query(By.css('.form-error'))).toBeTruthy();
  });
  // TODO: testowanie walidacji
});
