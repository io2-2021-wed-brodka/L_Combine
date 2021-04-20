import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Bike, BikeState } from 'src/app/models/bike';
import { BikeStation, StationState } from 'src/app/models/bikeStation';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { RentBikeService } from 'src/app/services/rent-bike.service';
import { StationService } from 'src/app/services/station.service';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub ';
import mockStationService from 'src/app/testing/mock-services/mockStationService';

import { ReturnBikeComponent } from './return-bike.component';

describe('ReturnBikeComponent', () => {
  let component: ReturnBikeComponent;
  let fixture: ComponentFixture<ReturnBikeComponent>;

  let redirect: jasmine.SpyObj<RedirectService>;
  let notification: jasmine.SpyObj<NotificationService>;
  let rentBike: jasmine.SpyObj<RentBikeService>;

  let testStation: BikeStation;
  beforeEach(async () => {
    const rentBikeServiceSpy = jasmine.createSpyObj('RentBikeService', ['returnBike']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['redirectToHome','goBack']);
    await TestBed.configureTestingModule({
      declarations: [ ReturnBikeComponent ],
      providers: [
        {provide: StationService, useValue: mockStationService},
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub({['id']: 'id'})},
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: RedirectService, useValue: redirectServiceSpy},
        {provide: RentBikeService, useValue: rentBikeServiceSpy}
      ]
    })
    .compileComponents();
    notification = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirect = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    rentBike = TestBed.inject(RentBikeService) as jasmine.SpyObj<RentBikeService>;

    rentBike.returnBike.and.returnValue(of({id: 'id', bikeStatus: BikeState.Available, user: null, station: null}));

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnBikeComponent);
    component = fixture.componentInstance;
    testStation = {id: 'id', locationName: 'name', stationState: StationState.Active}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('#stations should be called on init', ()=>{
    expect(component.stations.length).toBeTruthy();
  });

  it('#bikeId should be defined on init', ()=>{
    expect(component.bikeId).toEqual('id');
  });

  it('#return should return bike', ()=>{
    expect(rentBike.returnBike).toHaveBeenCalledTimes(0);
    component.returnBike(testStation);
    expect(rentBike.returnBike).toHaveBeenCalledTimes(1);
  });
  
  it('#return should redirect home', ()=>{
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
    component.returnBike(testStation);
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(1);
  });
  
  it('#return should send notification', ()=>{
    expect(notification.success).toHaveBeenCalledTimes(0);
    component.returnBike(testStation);
    expect(notification.success).toHaveBeenCalledTimes(1);
  });

  it('#goBack should redirect to previous screen', ()=>{
    expect(redirect.goBack).toHaveBeenCalledTimes(0);
    component.goBack();
    expect(redirect.goBack).toHaveBeenCalledTimes(1);
  });

  it('should show all the stations', ()=>{
    const listElems = fixture.debugElement.queryAll(By.css('.list-item'));
    expect(listElems.length).toEqual(component.stations.length);
  });

  it('should show stations location name and its state', ()=>{
    const listElem = fixture.debugElement.query(By.css('.list-item'));
    expect(listElem.children.length).toEqual(2);
    expect(listElem.children[0].nativeElement.textContent).toContain(component.stations[0].locationName);
    expect(listElem.children[1].nativeElement.textContent).toContain('Aktywna');
  });

  it('should return bike on station click', ()=>{
    expect(rentBike.returnBike).toHaveBeenCalledTimes(0);
    fixture.debugElement.query(By.css('.list-item')).triggerEventHandler('click',null);
    expect(rentBike.returnBike).toHaveBeenCalledTimes(1);
  });
});
