import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListStationsComponent} from './list-stations.component';
import {By} from '@angular/platform-browser';
import {StationService} from '../../../services/station.service';
import {BikeStation, StationState} from '../../../models/bikeStation';
import {DebugElement} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {RedirectService} from '../../../services/redirect.service';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {StationDTO} from '../../../dto/station-dto';
import mockStationService from 'src/app/testing/mock-services/mockStationService';

describe('ListStationsComponent', () => {
  let component: ListStationsComponent;
  let fixture: ComponentFixture<ListStationsComponent>;
  let debugElement: DebugElement;

  let stationService: jasmine.SpyObj<StationService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let redirectService: jasmine.SpyObj<RedirectService>;

  const stationDTO: StationDTO = {
    id: 'a',
    status: StationState.Active,
    name: 'b',
    activeBikesCount: 1,
    bikesLimit: 10
  };

  beforeEach(async () => {
    const stationServiceSpy = jasmine.createSpyObj('StationService', ['getStations', 'addStation']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['reload']);

    await TestBed.configureTestingModule({
      declarations: [ListStationsComponent],
      providers: [
        {
          provide: StationService,
          useValue: stationServiceSpy
        }, {
          provide: NotificationService,
          useValue: notificationServiceSpy
        }, {
          provide: RedirectService,
          useValue: redirectServiceSpy
        }
      ], imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    redirectService = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    stationService = TestBed.inject(StationService) as jasmine.SpyObj<StationService>;

    stationService.getStations.and.returnValue(mockStationService.getStations());
    stationService.addStation.and.returnValue(of(stationDTO));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#stations should be defined on init', () => {
    expect(component.stations.length).toBeTruthy();
  });

  it('should inform station is active', () => {
    component.stations[0].stationState = StationState.Active;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.list-item-side-right span'));
    expect(span.nativeElement.textContent).toContain('Aktywna');
  });

  it('should inform station is blocked', () => {
    component.stations[0].stationState = StationState.Blocked;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.list-item-side-right  span'));
    expect(span.nativeElement.textContent).toContain('Zablokowana');
  });

  it('should show location name', () => {
    const div = fixture.debugElement.query(By.css('.list-item-side-left'));
    expect(div.nativeElement.textContent).toContain(component.stations[0].locationName);

  });

  it('should select station when clicked', () => {
    debugElement.query(By.css('.list-item')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedStation).toEqual(component.stations[0]);
  });

  it('should set station as selected when passed in #selectStation', () => {
    component.selectStation(component.stations[0]);

    expect(component.selectedStation).toEqual(component.stations[0]);
  });

  it('should raise event when selecting station', () => {
    component.selectedStationChanged.subscribe((station: BikeStation) =>
      expect(station).toEqual(component.stations[0])
    );

    component.selectStation(component.stations[0]);
  });

  it('should call #addStation in #addStation', () => {
    component.newStation = {name:'aa', bikesLimit: 10};
    component.addStation();

    expect(stationService.addStation).toHaveBeenCalledOnceWith({name:'aa', bikesLimit: 10});
  });

  it('should call #success and #getStations after successful addStation', () => {
    component.newStation = {name:'aa', bikesLimit: 10};
    component.addStation();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
    expect(stationService.getStations).toHaveBeenCalledTimes(2);
  });

  it('should show station-management for selected station', () => {
    component.selectedStation = component.stations[0];
    fixture.detectChanges();

    expect(debugElement.query(By.css('.list-item')).children[2].classes).toEqual({'station-management': true});
  });

  it('should call #getStations in onStationModified', () => {
    component.onStationModified();
    expect(stationService.getStations).toHaveBeenCalledTimes(2);
  });
});
