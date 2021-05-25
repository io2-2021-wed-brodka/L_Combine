import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StationManagementComponent} from './station-management.component';
import {NotificationService} from '../../../../services/notification.service';
import {DebugElement} from '@angular/core';
import {StationService} from '../../../../services/station.service';
import {BikeStation, StationState} from '../../../../models/bikeStation';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

describe('StationManagementComponent', () => {
  let component: StationManagementComponent;
  let fixture: ComponentFixture<StationManagementComponent>;
  let stationService: jasmine.SpyObj<StationService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const stationServiceSpy = jasmine.createSpyObj('StationService',
      ['deleteStation', 'blockStation', 'unblockStation']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);

    await TestBed.configureTestingModule({
      declarations: [StationManagementComponent],
      providers: [
        {
          provide: StationService,
          useValue: stationServiceSpy
        }, {
          provide: NotificationService,
          useValue: notificationServiceSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationManagementComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    stationService = TestBed.inject(StationService) as jasmine.SpyObj<StationService>;

    stationService.deleteStation.and.returnValue(of({}));
    stationService.blockStation.and.returnValue(of({
      id: 'a',
      status: StationState.Active,
      name: 'b',
      activeBikesCount: 1,
      bikesLimit: 10
    }));
    stationService.unblockStation.and.returnValue(of({}));

    component.station = {id: 'a', stationState: StationState.Active, locationName: 'b', bikeCount: 1, bikesLimit: 10};
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #deleteStation in #delete', () => {
    component.delete();

    expect(stationService.deleteStation).toHaveBeenCalledOnceWith('a');
  });

  it('should call #success and #emit after successful delete', () => {
    component.stationModified.subscribe((station: BikeStation) => expect(station).toEqual(component.station));
    component.delete();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('should call #blockStation in #block', () => {
    component.block();

    expect(stationService.blockStation).toHaveBeenCalledOnceWith('a');
  });

  it('should call #success and #emit after successful block', () => {
    component.stationModified.subscribe((station: BikeStation) => expect(station).toEqual(component.station));
    component.block();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('should call #unblockStation in #unblock', () => {
    component.unblock();

    expect(stationService.unblockStation).toHaveBeenCalledOnceWith('a');
  });

  it('should call #success and #emit after successful unblock', () => {
    component.stationModified.subscribe((station: BikeStation) => expect(station).toEqual(component.station));
    component.unblock();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('should show button with class "button-delete" when station is blocked', () => {
    component.station.stationState = StationState.Blocked;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-delete'))).toBeTruthy();
  });

  it('should not show button with class "button-delete" when station isnt blocked', () => {
    component.station.stationState = StationState.Active;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-delete'))).toBeFalsy();
  });

  it('should call #delete when clicking button with class "button-delete"', () => {
    component.station.stationState = StationState.Blocked;
    fixture.detectChanges();

    debugElement.query(By.css('.button-delete')).triggerEventHandler('click', null);

    expect(stationService.deleteStation).toHaveBeenCalledOnceWith('a');
  });

  it('should show button with class "button-block" when station isnt blocked', () => {
    component.station.stationState = StationState.Active;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-block'))).toBeTruthy();
    expect(debugElement.query(By.css('.button-unblock'))).toBeFalsy();
  });

  it('should call #block when clicking button with class "button-block"', () => {
    component.station.stationState = StationState.Active;
    fixture.detectChanges();

    debugElement.query(By.css('.button-block')).triggerEventHandler('click', null);

    expect(stationService.blockStation).toHaveBeenCalledOnceWith('a');
  });

  it('should show button with class "button-unblock" when station is blocked', () => {
    component.station.stationState = StationState.Blocked;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.button-block'))).toBeFalsy();
    expect(debugElement.query(By.css('.button-unblock'))).toBeTruthy();
  });

  it('should call #unblock when clicking button with class "button-unblock"', () => {
    component.station.stationState = StationState.Blocked;
    fixture.detectChanges();

    debugElement.query(By.css('.button-unblock')).triggerEventHandler('click', null);

    expect(stationService.unblockStation).toHaveBeenCalledOnceWith('a');
  });
});
