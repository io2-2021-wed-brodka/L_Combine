import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListStationBikesComponent} from './list-station-bikes.component';
import {StationService} from '../../services/station.service';
import {of} from 'rxjs';
import {BikeState} from '../../models/bike';
import {BikeStation, StationState} from '../../models/bikeStation';
import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'test-host-component',
  template: '<div><app-list-station-bikes [station]="station"></app-list-station-bikes></div>'
})
class TestHostComponent {
  @ViewChild(ListStationBikesComponent) listStationBikesComponent: any;
  station: BikeStation = {
    id: 'a',
    stationState: StationState.Active,
    locationName: 'a',
    bikeCount: 1
  };
}

describe('ListStationBikesComponent', () => {
  let component: ListStationBikesComponent;
  let fixture: ComponentFixture<ListStationBikesComponent>;
  let stationService: jasmine.SpyObj<StationService>;

  const station: BikeStation = {
    id: 'a',
    stationState: StationState.Active,
    locationName: 'a',
    bikeCount: 1
  };

  beforeEach(async () => {
    const stationServiceSpy = jasmine.createSpyObj('StationService', ['getStationBikes']);

    await TestBed.configureTestingModule({
      declarations: [ListStationBikesComponent, TestHostComponent],
      providers: [
        {provide: StationService, useValue: stationServiceSpy}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationBikesComponent);
    component = fixture.componentInstance;

    stationService = TestBed.inject(StationService) as jasmine.SpyObj<StationService>;
    stationService.getStationBikes.and.returnValue(of({
      bikes: [
        {id: 'a', bikeStatus: BikeState.Available}
      ]
    }));
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
});
