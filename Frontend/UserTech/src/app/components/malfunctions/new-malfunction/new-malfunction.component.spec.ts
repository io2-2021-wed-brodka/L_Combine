import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewMalfunctionComponent} from './new-malfunction.component';
import {DebugElement} from '@angular/core';
import {RedirectService} from '../../../services/redirect.service';
import {NotificationService} from '../../../services/notification.service';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ActivatedRouteStub} from '../../../testing/ActivatedRouteStub ';
import {MalfunctionService} from '../../../services/malfunction.service';
import {of} from 'rxjs';

describe('NewMalfunctionComponent', () => {
  let component: NewMalfunctionComponent;
  let fixture: ComponentFixture<NewMalfunctionComponent>;
  let debugElement: DebugElement;

  let redirect: jasmine.SpyObj<RedirectService>;
  let notification: jasmine.SpyObj<NotificationService>;
  let malfunction: jasmine.SpyObj<MalfunctionService>;

  beforeEach(async () => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['redirectToHome', 'goBack']);
    const malfunctionServiceSpy = jasmine.createSpyObj('MalfunctionService', ['postMalfunction']);
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NewMalfunctionComponent],
      providers: [
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub({['id']: 'id'})},
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: RedirectService, useValue: redirectServiceSpy},
        {provide: MalfunctionService, useValue: malfunctionServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMalfunctionComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    notification = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirect = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    malfunction = TestBed.inject(MalfunctionService) as jasmine.SpyObj<MalfunctionService>;

    malfunction.postMalfunction.and.returnValue(of({id: 'id', reportingUserId: 'id', bikeId: 'id', description: 'd'}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#bikeId should be defined on init', () => {
    fixture.detectChanges();
    expect(component.bikeId).toEqual('id');
  });

  it('#goBack should redirect to previous screen', () => {
    expect(redirect.goBack).toHaveBeenCalledTimes(0);
    component.goBack();
    expect(redirect.goBack).toHaveBeenCalledTimes(1);
  });

  it('#report should redirect home', () => {
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
    component.report();
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(1);
  });

  it('#report should send notification', () => {
    expect(notification.success).toHaveBeenCalledTimes(0);
    component.report();
    expect(notification.success).toHaveBeenCalledTimes(1);
  });

  it('#report should post malfunction', () => {
    expect(malfunction.postMalfunction).toHaveBeenCalledTimes(0);
    component.report();
    expect(malfunction.postMalfunction).toHaveBeenCalledOnceWith({id: component.bikeId, description: component.description});
  });
});
