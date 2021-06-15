import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Role} from 'src/app/dto/authenticate-response-dto';
import {LoginService} from 'src/app/services/login.service';

import {MainComponent} from './main.component';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({selector: 'router-outlet'})
class RouterOutletStub {
}

@Component({selector: 'app-notifications'})
class AppNotificationsStub {
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let login: jasmine.SpyObj<LoginService>;
  let modal: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['logout', 'getRole']);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);
    await TestBed.configureTestingModule({
      declarations: [MainComponent, RouterOutletStub, AppNotificationsStub],
      providers: [
        {provide: LoginService, useValue: loginServiceSpy},
        {provide: NgbModal, useValue: modalServiceSpy}
      ],
      imports: [NgbModule]
    })
      .compileComponents();
    login = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    login.getRole.and.returnValue(Role.Tech);
    modal = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get role on init', () => {
    expect(component.isTech).toBeTrue();
  });

  it('#logout should call service logout function', () => {
    expect(login.logout).toHaveBeenCalledTimes(0);
    component.logout();
    expect(login.logout).toHaveBeenCalledTimes(1);
  });

  it('should logout on button click', () => {
    expect(login.logout).toHaveBeenCalledTimes(0);
    const button = fixture.debugElement.query(By.css('.logout'));
    button.triggerEventHandler('click', null);
    expect(login.logout).toHaveBeenCalledTimes(1);
  });

  it('should call #modalService.open on contact-button click', () => {
    expect(modal.open).toHaveBeenCalledTimes(0);
    const button = fixture.debugElement.query(By.css('.contact-button'));
    button.triggerEventHandler('click', null);
    expect(modal.open).toHaveBeenCalledTimes(1);
  });
});
