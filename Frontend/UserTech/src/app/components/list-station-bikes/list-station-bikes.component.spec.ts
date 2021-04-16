import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Bike } from 'src/app/models/bike';
import { StationService } from 'src/app/services/station.service';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub ';
import mockStationService from 'src/app/testing/mock-services/mockStationService';

import { ListStationBikesComponent } from './list-station-bikes.component';

@Component({selector: 'app-rent-bike', template: ''})
class RentBikeStubComponent {
    @Input() bike!: Bike;
}

describe('ListRentedBikesComponent', () => {
  let component: ListStationBikesComponent;
  let fixture: ComponentFixture<ListStationBikesComponent>;

  beforeEach(async () => {
    const activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub({['id']: 'id1'});
    const location = {
        goBack(){}
    }
    await TestBed.configureTestingModule({
      declarations: [ ListStationBikesComponent, RentBikeStubComponent ],
      providers: [
        {provide: StationService, useValue: mockStationService },
        {provide: ActivatedRoute, useValue: activatedRouteStub },
        {provide: Location, useValue: location}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no bike selected on start', ()=>{
    expect(component.selectedBike).toBe(undefined);
    const list = fixture.debugElement;
    expect(list.query(By.css('.rent-bike'))).toBeFalsy();
  });
  
  it('#station defined on init', ()=>{
    expect(component.station).toBeTruthy()
  });

  it('#bikes defined on init', ()=>{
    expect(component.bikes.length).toBeTruthy()
  });

  it('enable renting after selecting bike', ()=>{
    const bike = component.bikes[0];
    component.selectBike(bike);
    fixture.detectChanges();
    expect(component.selectedBike).toBe(bike);
    const detailed = fixture.debugElement.queryAll(By.css('.rent-bike'));
    expect(detailed.length).toBe(1);
    const detailedBikeId = detailed[0].parent?.childNodes[0]?.nativeNode.textContent;
    expect(detailedBikeId).toContain(bike.id)
  });
  
  it('disable renting after selecting other', ()=>{
    const bike1 = component.bikes[0];
    const bike2 = component.bikes[1];
    component.selectBike(bike1);
    component.selectBike(bike2);
    fixture.detectChanges();
    expect(component.selectedBike).toBe(bike2);
    const detailed = fixture.debugElement.queryAll(By.css('.rent-bike'));
    expect(detailed.length).toBe(1);
    const detailedBikeId = detailed[0].parent?.childNodes[0]?.nativeNode.textContent;
    expect(detailedBikeId).toContain(bike2.id)
  });
});
