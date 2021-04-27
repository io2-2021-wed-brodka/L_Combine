import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BikeManagementComponent} from './bike-management.component';
import {BikeService} from '../../../../services/bike.service';
import {NotificationService} from '../../../../services/notification.service';
import {RedirectService} from '../../../../services/redirect.service';
import {of} from 'rxjs';
import {BikeState} from '../../../../models/bike';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('BikeManagementComponent', () => {
  let component: BikeManagementComponent;
  let fixture: ComponentFixture<BikeManagementComponent>;
  let bikeService: jasmine.SpyObj<BikeService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let redirectService: jasmine.SpyObj<RedirectService>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['deleteBike']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['reload']);

    await TestBed.configureTestingModule({
      declarations: [ BikeManagementComponent ],
      providers: [
        {
          provide: BikeService,
          useValue: bikeServiceSpy
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
    fixture = TestBed.createComponent(BikeManagementComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    redirectService = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;

    bikeService.deleteBike.and.returnValue(of({}));

    component.bike = {id: 'a', state: BikeState.Available};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #deleteBike in #delete', () => {
    component.delete();

    expect(bikeService.deleteBike).toHaveBeenCalledOnceWith('a');
  });

  it('should call #success and #reload after successful delete', () => {
    component.delete();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
    expect(redirectService.reload).toHaveBeenCalledTimes(1);
  });

  it('should call #delete when clicking button with class "button-delete"', () => {
    fixture.detectChanges();

    debugElement.query(By.css('.button-delete')).triggerEventHandler('click', null);

    expect(bikeService.deleteBike).toHaveBeenCalledOnceWith('a');
  });
});
