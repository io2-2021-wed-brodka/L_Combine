import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BikeManagementComponent} from './bike-management.component';
import {BikeService} from '../../../../services/bike.service';
import {NotificationService} from '../../../../services/notification.service';
import {of} from 'rxjs';
import {Bike, BikeState} from '../../../../models/bike';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('BikeManagementComponent', () => {
  let component: BikeManagementComponent;
  let fixture: ComponentFixture<BikeManagementComponent>;
  let bikeService: jasmine.SpyObj<BikeService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['deleteBike', 'blockBike', 'unblockBike']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [BikeManagementComponent],
      providers: [
        {
          provide: BikeService,
          useValue: bikeServiceSpy
        }, {
          provide: NotificationService,
          useValue: notificationServiceSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeManagementComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;

    bikeService.deleteBike.and.returnValue(of({}));
    bikeService.blockBike.and.returnValue(of({id: 'b', status: BikeState.Available}));
    bikeService.unblockBike.and.returnValue(of({}));

    component.bike = {id: 'a', state: BikeState.Available};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #deleteBike in #delete', () => {
    component.delete();

    expect(bikeService.deleteBike).toHaveBeenCalledOnceWith('a');
  });

  it('should call #success and #emit after successful delete', () => {
    component.bikeModified.subscribe((bike: Bike) => expect(bike).toEqual(component.bike));
    component.delete();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('should call #blockBike in #block', () => {
    component.block();

    expect(bikeService.blockBike).toHaveBeenCalledOnceWith('a');
  });

  it('should call #success and #emit after successful block', () => {
    component.bikeModified.subscribe((bike: Bike) => expect(bike).toEqual(component.bike));
    component.block();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('should call #deleteBike in #unblock', () => {
    component.unblock();

    expect(bikeService.unblockBike).toHaveBeenCalledOnceWith('a');
  });

  it('should call #success and #emit after successful unblock', () => {
    component.bikeModified.subscribe((bike: Bike) => expect(bike).toEqual(component.bike));
    component.unblock();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('should show button with class "button-delete" when station is blocked', () => {
    component.bike.state = BikeState.Blocked;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-delete'))).toBeTruthy();
  });

  it('should not show button with class "button-delete" when station isnt blocked', () => {
    component.bike.state = BikeState.Available;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-delete'))).toBeFalsy();
  });

  it('should call #delete when clicking button with class "button-delete"', () => {
    component.bike.state = BikeState.Blocked;
    fixture.detectChanges();

    debugElement.query(By.css('.button-delete')).triggerEventHandler('click', null);

    expect(bikeService.deleteBike).toHaveBeenCalledOnceWith('a');
  });

  it('should show button with class "button-block" when station isnt blocked', () => {
    component.bike.state = BikeState.Available;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-block'))).toBeTruthy();
    expect(debugElement.query(By.css('.button-unblock'))).toBeFalsy();
  });

  it('should call #block when clicking button with class "button-block"', () => {
    component.bike.state = BikeState.Available;
    fixture.detectChanges();

    debugElement.query(By.css('.button-block')).triggerEventHandler('click', null);

    expect(bikeService.blockBike).toHaveBeenCalledOnceWith('a');
  });

  it('should show button with class "button-unblock" when station is blocked', () => {
    component.bike.state = BikeState.Blocked;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-block'))).toBeFalsy();
    expect(debugElement.query(By.css('.button-unblock'))).toBeTruthy();
  });

  it('should call #unblock when clicking button with class "button-unblock"', () => {
    component.bike.state = BikeState.Blocked;
    fixture.detectChanges();

    debugElement.query(By.css('.button-unblock')).triggerEventHandler('click', null);

    expect(bikeService.unblockBike).toHaveBeenCalledOnceWith('a');
  });
});
