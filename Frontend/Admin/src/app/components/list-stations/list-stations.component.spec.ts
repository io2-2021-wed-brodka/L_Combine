import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListStationsComponent} from './list-stations.component';
import {By} from '@angular/platform-browser';
import {StationService} from '../../services/station.service';
import mockStationService from '../../testing/mock-services/mockStationService';
import {BikeStation, StationState} from '../../models/bikeStation';
import {DebugElement} from '@angular/core';

describe('ListStationsComponent', () => {
  let component: ListStationsComponent;
  let fixture: ComponentFixture<ListStationsComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStationsComponent ],
      providers: [
        {provide: StationService, useValue: mockStationService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#stations should be defined on init', ()=>{
    expect(component.stations.length).toBeTruthy();
  });

  it('should inform station is active',()=>{
    component.stations[0].stationState = StationState.Active;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.list-item-side-right > span'));
    expect(span.nativeElement.textContent).toContain('Aktywna');
  });

  it('should inform station is blocked',()=>{
    component.stations[0].stationState = StationState.Blocked;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.list-item-side-right > span'));
    expect(span.nativeElement.textContent).toContain('Zablokowana');
  });

  it('should show location name', ()=>{
    const div = fixture.debugElement.query(By.css('.list-item-side-left'));
    expect(div.nativeElement.textContent).toContain(component.stations[0].locationName);

  });

  it('should select station when clicked', () => {
    debugElement.query(By.css('.list-item')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedStation).toEqual(component.stations[0]);
  });

  it('should set station as selected when passed in #selectStation and not already selected', () => {
    component.selectStation(component.stations[0]);

    expect(component.selectedStation).toEqual(component.stations[0]);
  });

  it('should unselect station when passed in #selectStation and already selected', () => {
    component.selectedStation = component.stations[0];
    component.selectStation(component.stations[0]);
    expect(component.selectedStation).toBeUndefined();
  });

  it('should raise event when selecting station', () => {
    component.selectedStationChanged.subscribe((station: BikeStation) =>
      expect(station).toEqual(component.stations[0])
    );

    component.selectStation(component.stations[0]);
  });
});
