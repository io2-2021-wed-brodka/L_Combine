import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { TechService } from 'src/app/services/tech.service';

import { AddTechComponent } from './add-tech.component';

describe('AddTechComponent', () => {
  let component: AddTechComponent;
  let fixture: ComponentFixture<AddTechComponent>;
  let techService: jasmine.SpyObj<TechService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let redirectService: jasmine.SpyObj<RedirectService>;

  beforeEach(async () => {
    const techServiceSpy = jasmine.createSpyObj('TechService', ['addTech']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['reload']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [ AddTechComponent ],
      imports: [FormsModule],
      providers: [
        {
          provide: TechService,
          useValue: techServiceSpy
        }, {
          provide: NotificationService,
          useValue: notificationServiceSpy
        }, {
          provide: RedirectService,
          useValue: redirectServiceSpy
        }
      ]
    })
    .compileComponents();
    techService = TestBed.inject(TechService) as jasmine.SpyObj<TechService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirectService = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    
    techService.addTech.and.returnValue(of({name: 'name', id: 'id'}));
    notificationService.success.and.returnValue();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addTech should call #techService.addTech', () => {
    component.addTech();

    expect(techService.addTech).toHaveBeenCalledTimes(1);
  });

  it('#addTech should not call #techService.addTech if passwords dont match', () => {
    component.formData.password = 'pass';
    component.formData.repeatPassword = 'not_pass';
    component.addTech();

    expect(component.showPasswordsNotMatch).toBeTrue();
    expect(techService.addTech).toHaveBeenCalledTimes(0);
  });
  
  it('#addTech should call #notificationService.success if response is success', () => {
    component.formData.login = 'login';
    component.formData.password = 'pass';
    component.formData.repeatPassword = 'pass';
    component.addTech();

    expect(notificationService.success).toHaveBeenCalled();
  });

  it('#addTech should call set #showAccountNameTaken if response status is 409', () => {
    techService.addTech.and.returnValue(throwError(new HttpErrorResponse({status: 409})));
    expect(component.showAccountNameTaken).toBeFalse();
    component.addTech();
    expect(component.showAccountNameTaken).toBeTrue();
  });

  it('#repeatPasswordChange should set #showPasswordsNotMatch to false', () => {
    component.repeatPasswordChange();
    expect(component.showPasswordsNotMatch).toBeFalse();
  });
  
  it('#loginChange should set #showAccountNameTaken', () => {
    component.loginChange();

    expect(component.showAccountNameTaken).toBeFalse();
  });

});
