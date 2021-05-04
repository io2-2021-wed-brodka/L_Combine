import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/login.service';

import { MainComponent } from './main.component';

@Component({selector: 'router-outlet'})
class RouterOutletStub{}

@Component({selector: 'app-notifications'})
class AppNotificationsStub{}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let login: jasmine.SpyObj<LoginService>
  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['logout','getRole']);
    await TestBed.configureTestingModule({
      declarations: [ MainComponent, RouterOutletStub, AppNotificationsStub ],
      providers: [
          {provide: LoginService, useValue: loginServiceSpy}
      ]
    })
    .compileComponents();
    login = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#logout should call service logout function', ()=>{
    expect(login.logout).toHaveBeenCalledTimes(0);
    component.logout();
    expect(login.logout).toHaveBeenCalledTimes(1);
  });

  it('should logout on button click', ()=>{
    expect(login.logout).toHaveBeenCalledTimes(0);
    const button = fixture.debugElement.query(By.css('.logout'));
    button.triggerEventHandler('click', null);
    expect(login.logout).toHaveBeenCalledTimes(1);
  });
});
