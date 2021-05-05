import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {RegisterService} from '../../services/register.service';
import {DebugElement} from '@angular/core';
import {of, throwError} from 'rxjs';
import {NotificationService} from '../../services/notification.service';
import {RedirectService} from '../../services/redirect.service';
import {FormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import { Role } from 'src/app/dto/authenticate-response-dto';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerService: jasmine.SpyObj<RegisterService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let redirectService: jasmine.SpyObj<RedirectService>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['register']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['redirectToLogin']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: RegisterService,
          useValue: registerServiceSpy
        }, {
          provide: NotificationService,
          useValue: notificationServiceSpy
        }, {
          provide: RedirectService,
          useValue: redirectServiceSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    registerService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirectService = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.formData.login = 'a';
    component.formData.password = 'b';
    component.formData.repeatPassword = 'b';

    registerService.register.and.returnValue(of({token: 'a', role: Role.User}));
    notificationService.success.and.returnValue();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#register should call #registerService.register with formData', () => {
    component.register();

    expect(registerService.register).toHaveBeenCalledOnceWith({login: 'a', password: 'b'});
  });

  it('#register should not call #registerService.register if passwords dont match', () => {
    component.formData.repeatPassword = 'c';
    component.register();

    expect(component.showPasswordsNotMatch).toBeTrue();
    expect(registerService.register).toHaveBeenCalledTimes(0);
  });

  it('#register should call #notificationService.success if response is success', () => {
    component.register();

    expect(notificationService.success).toHaveBeenCalled();
  });

  it('#register should call #redirectService if response is success', () => {
    component.register();

    expect(redirectService.redirectToLogin).toHaveBeenCalled();
  });

  it('#register should call set showAccountNameTaken if response status is 409', () => {
    registerService.register.and.returnValue(throwError(new HttpErrorResponse({status: 409})));
    expect(component.showAccountNameTaken).toBeFalse();

    component.register();

    expect(component.showAccountNameTaken).toBeTrue();
  });

  it('#repeatPasswordChange should set', () => {
    component.repeatPasswordChange();

    expect(component.showPasswordsNotMatch).toBeFalse();
  });

  it('#loginChange should set', () => {
    component.loginChange();

    expect(component.showAccountNameTaken).toBeFalse();
  });

  it('clicking button should call register', () => {
    fixture.detectChanges();

    debugElement.query(By.css('.main-button')).triggerEventHandler('click', null);
    expect(registerService.register).toHaveBeenCalledTimes(1);
  });

  it('should show loginTaken when login valid and flag set', () => {
    component.showAccountNameTaken = true;
    fixture.detectChanges();

    fixture.detectChanges();
    expect(debugElement.query(By.css('.form-error')).nativeElement.textContent.trim())
      .toEqual('Login jest zajęty!');
  });

  it('should show passwordsMismatch when repeatPassword valid and flag set', () => {
    component.showPasswordsNotMatch = true;
    fixture.detectChanges();

    fixture.detectChanges();
    expect(debugElement.query(By.css('.form-error')).nativeElement.textContent.trim())
      .toEqual('Hasła nie są takie same!');
  });
});
