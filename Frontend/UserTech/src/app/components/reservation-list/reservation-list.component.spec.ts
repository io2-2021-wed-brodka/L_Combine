import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationListComponent} from './reservation-list.component';
import {ReservationService} from '../../services/reservation.service';
import {Component, DebugElement} from '@angular/core';
import {of} from 'rxjs';
import {ReservedBikesDTO} from '../../dto/reserved-bike-dto';
import {reservedBikeFromDTO} from '../../utils/dto-utils';
import {ReservedBike} from '../../models/reserved-bike';
import {BikeState} from '../../models/bike';
import {By} from '@angular/platform-browser';
import {StationState} from '../../models/bikeStation';

@Component({selector: 'app-reserved-bike-details', template: '<div></div>'})
class ReservedBikeDetailsStubComponent {

}

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;
  let debugElement: DebugElement;
  let reservationService: jasmine.SpyObj<ReservationService>;

  const reservedBikesDTO: ReservedBikesDTO = {
    bikes: [
      {
        id: '1',
        station: {id: '1', status: StationState.Active, name: 'a', activeBikesCount: 1},
        reservedAt: new Date().toString(),
        reservedTill: new Date(Date.now() + 10000000000).toString()
      }
    ]
  };

  const reservedBike: ReservedBike = {
    id: '1',
    state: BikeState.Reserved,
    reservedAt: new Date(),
    reservedTill: new Date()
  };

  beforeEach(async () => {
    const reservationServiceSpy = jasmine.createSpyObj('reservationService', ['getReservedBikes']);

    await TestBed.configureTestingModule({
      declarations: [
        ReservationListComponent,
        ReservedBikeDetailsStubComponent
      ],
      providers: [
        {
          provide: ReservationService,
          useValue: reservationServiceSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    reservationService = TestBed.inject(ReservationService) as jasmine.SpyObj<ReservationService>;
    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    reservationService.getReservedBikes.and.returnValue(of(reservedBikesDTO));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reserved bikes after creation', () => {
    fixture.detectChanges();

    expect(reservationService.getReservedBikes).toHaveBeenCalledTimes(1);
    console.log(reservedBikesDTO.bikes.map(reservedBikeFromDTO));
    expect(component.reservedBikes).toEqual(reservedBikesDTO.bikes.map(reservedBikeFromDTO));
  });

  it('should set bike as selected when passed in #selectBike and not already selected', () => {
    component.selectBike(reservedBike);

    expect(component.selectedBike).toEqual(reservedBike);
  });

  it('should unselect bike when passed in #selectBike and already selected', () => {
    component.selectedBike = reservedBike;
    component.selectBike(reservedBike);
    expect(component.selectedBike).toBeUndefined();
  });

  it('should display all reserved bikes', () => {
    component.reservedBikes = [reservedBike];
    fixture.detectChanges();

    expect(debugElement.queryAll(By.css('.list-item')).length).toEqual(1);
  });

  it('should select bike when clicked', () => {
    fixture.detectChanges();
    component.reservedBikes = [reservedBike];
    fixture.detectChanges();

    debugElement.query(By.css('.list-item')).triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedBike).toEqual(reservedBike);
  });

  it('should display details for selected bike', () => {
    fixture.detectChanges();
    component.reservedBikes = [reservedBike];
    component.selectedBike = reservedBike;
    fixture.detectChanges();

    expect(debugElement.query(By.css('.reserved-bike-details'))).toBeTruthy();
  });
});
