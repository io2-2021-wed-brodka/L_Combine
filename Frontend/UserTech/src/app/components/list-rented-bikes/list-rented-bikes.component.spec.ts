import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Bike } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';
import mockBikeService from 'src/app/testing/mock-services/mockBikeService';

import { ListRentedBikesComponent } from './list-rented-bikes.component';

@Component({selector: 'app-rented-bike-details', template: ''})
class RentedBikeDetailsStubComponent {
  @Input() bike!: Bike;
}

describe('ListRentedBikesComponent', () => {
  let component: ListRentedBikesComponent;
  let fixture: ComponentFixture<ListRentedBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentedBikesComponent, RentedBikeDetailsStubComponent ],
      providers: [
        {provide: BikeService, useValue: mockBikeService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentedBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all bikes',()=>{
    const listItems = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(listItems.length).toEqual(mockBikeService.bikes.length);
  });

  it('no bike should be selected on start', ()=>{
    expect(component.selectedBike).toBe(undefined);
    const list = fixture.debugElement;
    expect(list.query(By.css('.return-bike'))).toBeFalsy();
  });
  
  it('#rentedBikes should be defined on init', ()=>{
    expect(component.rentedBikes.length).toBeTruthy()
  });

  it('should show bike details after selecting a bike', ()=>{
    const bike = component.rentedBikes[0];
    component.selectBike(bike);
    fixture.detectChanges();
    expect(component.selectedBike).toBe(bike);
    const detailed = fixture.debugElement.queryAll(By.css('.return-bike'));
    expect(detailed.length).toBe(1);
    const detailedBikeId = detailed[0].parent?.childNodes[0]?.nativeNode.textContent;
    expect(detailedBikeId).toContain(bike.id)
  });
  
  it('should hide bike details after selecting other', ()=>{
    const bike1 = component.rentedBikes[0];
    const bike2 = component.rentedBikes[1];
    component.selectBike(bike1);
    component.selectBike(bike2);
    fixture.detectChanges();
    expect(component.selectedBike).toBe(bike2);
    const detailed = fixture.debugElement.queryAll(By.css('.return-bike'));
    expect(detailed.length).toBe(1);
    const detailedBikeId = detailed[0].parent?.childNodes[0]?.nativeNode.textContent;
    expect(detailedBikeId).toContain(bike2.id)
  });

  it('should show bike id', ()=>{
    const container = fixture.debugElement.query(By.css('.list-item-side-left'));
    expect(container.nativeElement.textContent).toContain(component.rentedBikes[0].id);  
  })
});
