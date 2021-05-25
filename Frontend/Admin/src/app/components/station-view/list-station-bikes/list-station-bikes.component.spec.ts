import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListStationBikesComponent} from './list-station-bikes.component';
import {StationService} from '../../../services/station.service';
import {of} from 'rxjs';
import {Bike, BikeState} from '../../../models/bike';
import {BikeStation, StationState} from '../../../models/bikeStation';
import {Component, DebugElement, ViewChild} from '@angular/core';
import {NotificationService} from '../../../services/notification.service';
import {BikeService} from '../../../services/bike.service';
import {By} from '@angular/platform-browser';
import {BikeDTO} from '../../../dto/bike-dto';

@Component({
  selector: 'app-test-host-component',
  template: '<div><app-list-station-bikes [station]="station"></app-list-station-bikes></div>'
})
class TestHostComponent {
  @ViewChild(ListStationBikesComponent) listStationBikesComponent: any;
  station: BikeStation = {
    id: 'a',
    stationState: StationState.Active,
    locationName: 'a',
    bikeCount: 1,
    bikesLimit: 10
  };
}

describe('ListStationBikesComponent', () => {
  let component: ListStationBikesComponent;
  let fixture: ComponentFixture<ListStationBikesComponent>;
  let debugElement: DebugElement;

  let stationService: jasmine.SpyObj<StationService>;
  let bikeService: jasmine.SpyObj<BikeService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  const station: BikeStation = {
    id: 'a',
    stationState: StationState.Active,
    locationName: 'a',
    bikeCount: 1,
    bikesLimit: 10
  };

  const bikeDTO: BikeDTO = {id: 'b', bikeStatus: BikeState.Available};
  const bike: Bike = {id: 'b', state: BikeState.Available};

  beforeEach(async () => {
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['addBike']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const stationServiceSpy = jasmine.createSpyObj('StationService', ['getStationBikes']);

    await TestBed.configureTestingModule({
      declarations: [ListStationBikesComponent, TestHostComponent],
      providers: [
        {
          provide: StationService,
          useValue: stationServiceSpy
        }, {
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
    fixture = TestBed.createComponent(ListStationBikesComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;
    stationService = TestBed.inject(StationService) as jasmine.SpyObj<StationService>;

    bikeService.addBike.and.returnValue(of(bikeDTO));
    stationService.getStationBikes.and.returnValue(of({bikes: [bikeDTO]}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not set bikes when station is falsy', () => {
    expect(component.station).toBeFalsy();

    fixture.detectChanges();

    expect(component.bikes).toEqual([]);
    expect(stationService.getStationBikes).toHaveBeenCalledTimes(0);
  });

  it('should set bikes when station is truthy', () => {
    component.station = station;
    expect(component.station).toBeTruthy();

    fixture.detectChanges();

    expect(component.bikes).toBeTruthy();
    expect(stationService.getStationBikes).toHaveBeenCalledOnceWith(station.id);
  });

  it('should recall #getStationBikes after binding changes', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    const hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    const bindComponent = hostComponent.listStationBikesComponent;
    spyOn(bindComponent, 'ngOnChanges').and.callThrough();

    hostComponent.station = {...station, id: 'b'};
    hostFixture.detectChanges();

    expect(bindComponent.ngOnChanges).toHaveBeenCalled();
  });

  it('should call #addBike in #addBike', () => {
    component.station = station;
    component.addBike();

    expect(bikeService.addBike).toHaveBeenCalledOnceWith({stationId: station.id});
  });

  it('should call #success and #getStationBikes after successful addBike', () => {
    component.station = station;
    component.addBike();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
    expect(stationService.getStationBikes).toHaveBeenCalledWith(station.id);
  });

  it('should call #getStationBikes in #onBikeModified', () => {
    component.station = station;
    component.onBikeModified();
    expect(stationService.getStationBikes).toHaveBeenCalledWith(station.id);
  });

  it('should call #addBike when clicking button with class "add-bike-button"', () => {
    component.station = station;
    fixture.detectChanges();

    debugElement.query(By.css('.add-bike-button')).triggerEventHandler('click', null);

    expect(bikeService.addBike).toHaveBeenCalledOnceWith({stationId: station.id});
  });

  it('#selectBike should select bike', () => {
    expect(component.selectedBike).toBeUndefined();
    component.selectBike(bike);
    expect(component.selectedBike).toEqual(bike);
  });

  it('should select bike when clicked', () => {
    component.station = station;
    fixture.detectChanges();

    debugElement.query(By.css('.list-item')).triggerEventHandler('click', null);

    expect(component.selectedBike).toEqual(component.bikes[0]);
  });

  it('should show bike-management for selected bike', () => {
    component.station = station;
    fixture.detectChanges();

    component.selectedBike = component.bikes[0];
    fixture.detectChanges();

    expect(debugElement.query(By.css('.list-item')).children[2].classes).toEqual({'bike-management': true});
  });

  it('#getBikeStateText returns Zablokowany for blocked bike', () => {
    expect(component.getBikeStateText(BikeState.Blocked)).toEqual('Zablokowany');
  });

  it('#getBikeStateText returns Dostępny for free bike', () => {
    expect(component.getBikeStateText(BikeState.Available)).toEqual('Dostępny');
  });

  it('#getBikeStateText returns Zarezerwowany for reserved bike', () => {
    expect(component.getBikeStateText(BikeState.Reserved)).toEqual('Zarezerwowany');
  });

  it('#getBikeStateText returns Wypożyczony for rented bike', () => {
    expect(component.getBikeStateText(BikeState.Rented)).toEqual('Wypożyczony');
  });
});
