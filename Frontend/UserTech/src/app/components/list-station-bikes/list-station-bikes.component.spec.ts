import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Bike } from 'src/app/models/bike';
import { RedirectService } from 'src/app/services/redirect.service';
import { StationService } from 'src/app/services/station.service';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub ';
import mockBikeService from 'src/app/testing/mock-services/mockBikeService';
import mockStationService from 'src/app/testing/mock-services/mockStationService';

import { ListStationBikesComponent } from './list-station-bikes.component';

@Component({selector: 'app-rent-bike', template: ''})
class RentBikeStubComponent {
    @Input() bike!: Bike;
}

describe('ListStationBikesComponent', () => {
  let component: ListStationBikesComponent;
  let fixture: ComponentFixture<ListStationBikesComponent>;
  let redirect: jasmine.SpyObj<RedirectService>;
  beforeEach(async () => {
    const activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub({['id']: 'id1', ['name']: 'name1'});
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['goBack'])
    await TestBed.configureTestingModule({
      declarations: [ ListStationBikesComponent, RentBikeStubComponent ],
      providers: [
        {provide: StationService, useValue: mockStationService },
        {provide: ActivatedRoute, useValue: activatedRouteStub },
        {provide: RedirectService, useValue: redirectServiceSpy}
      ]
    })
    .compileComponents();
    redirect = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no bike should be selected on start', ()=>{
    expect(component.selectedBike).toBe(undefined);
    const list = fixture.debugElement;
    expect(list.query(By.css('.rent-bike'))).toBeFalsy();
  });
  
  it('#stationName should be defined on init', ()=>{
    expect(component.stationName).toBeTruthy()
  });

  it('#bikes should be defined on init', ()=>{
    expect(component.bikes.length).toBeTruthy()
  });

  it('should display all bikes',()=>{
    const listItems = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(listItems.length).toEqual(mockBikeService.bikes.length);
  })

  it('should enable renting after selecting bike', ()=>{
    const bike = component.bikes[0];
    component.selectBike(bike);
    fixture.detectChanges();
    expect(component.selectedBike).toBe(bike);
    const detailed = fixture.debugElement.queryAll(By.css('.rent-bike'));
    expect(detailed.length).toBe(1); 
    const detailedBikeId = detailed[0].parent?.childNodes[0]?.nativeNode.textContent;
    expect(detailedBikeId).toContain(bike.id)
  });
  
  it('should disable renting after selecting other bike', ()=>{
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

  it('should go back on calling #goBack function', ()=>{
    component.goBack();
    expect(redirect.goBack).toHaveBeenCalledTimes(1);
  });

  it('should render the goBack button', ()=>{
    const button = fixture.debugElement.query(By.css('.wrapper > button'));
    expect(button).toBeTruthy();
  });

  it('should go Back on pressing the button', ()=>{
    const button = fixture.debugElement.query(By.css('.wrapper > button'));
    button.triggerEventHandler('click',null);
    expect(redirect.goBack).toHaveBeenCalledTimes(1);
  });
});
