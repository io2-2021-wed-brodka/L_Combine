import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservedBikeDetailsComponent} from './reserved-bike-details.component';
import {RentBikeService} from '../../services/rent-bike.service';
import {NotificationService} from '../../services/notification.service';
import {RedirectService} from '../../services/redirect.service';
import {ReservationService} from '../../services/reservation.service';
import {of} from 'rxjs';
import {ReservedBikeDTO} from '../../dto/reserved-bike-dto';
import {BikeDTO} from '../../dto/bike-dto';
import {BikeState} from '../../models/bike';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import { StationState } from 'src/app/models/bikeStation';

describe('ReservedBikeDetailsComponent', () => {
  let component: ReservedBikeDetailsComponent;
  let fixture: ComponentFixture<ReservedBikeDetailsComponent>;
  let debugElement: DebugElement;
  let rentBikeService: jasmine.SpyObj<RentBikeService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let redirectService: jasmine.SpyObj<RedirectService>;
  let reservationService: jasmine.SpyObj<ReservationService>;

  const reservedBike: ReservedBikeDTO = {
    id: '1'
  };
  const bikeDTO: BikeDTO = {
    id: '1',
    station: {id: '1', name: 'a', status: StationState.Active, activeBikeCount: 1},
    bikeStatus: BikeState.Available,
    user: {id: '2', name: 'a'}
  };

  beforeEach(async () => {
    const rentBikeServiceSpy = jasmine.createSpyObj('RentBikeService', ['rentBike']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['reload']);
    const reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['cancelReservation']);

    await TestBed.configureTestingModule({
      declarations: [ReservedBikeDetailsComponent],
      providers: [
        {
          provide: RentBikeService,
          useValue: rentBikeServiceSpy
        }, {
          provide: NotificationService,
          useValue: notificationServiceSpy
        }, {
          provide: RedirectService,
          useValue: redirectServiceSpy
        }, {
          provide: ReservationService,
          useValue: reservationServiceSpy
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    rentBikeService = TestBed.inject(RentBikeService) as jasmine.SpyObj<RentBikeService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirectService = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    reservationService = TestBed.inject(ReservationService) as jasmine.SpyObj<ReservationService>;
    fixture = TestBed.createComponent(ReservedBikeDetailsComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.bike = {
      id: '1',
      state: BikeState.Reserved,
    };

    rentBikeService.rentBike.and.returnValue(of(bikeDTO));
    // notificationService.success.and.returnValue();
    // redirectService.redirectToHome.and.returnValue();
    reservationService.cancelReservation.and.returnValue(of(reservedBike));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #rentBike with bike in #rent', () => {
    component.rent();

    expect(rentBikeService.rentBike).toHaveBeenCalledOnceWith(component.bike);
  });

  it('should call #success and #reload after successful rent', () => {
    component.rent();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
    expect(redirectService.reload).toHaveBeenCalledTimes(1);
  });

  it('should call #cancelReservation with bikeId in #cancel', () => {
    component.cancel();

    expect(reservationService.cancelReservation).toHaveBeenCalledOnceWith(component.bike.id);
  });

  it('should call #success and #reload after successful cancel', () => {
    component.cancel();

    expect(notificationService.success).toHaveBeenCalledTimes(1);
    expect(redirectService.reload).toHaveBeenCalledTimes(1);
  });

  it('should call #rent when clicking button with class "button-rent"', () => {
    fixture.detectChanges();

    debugElement.query(By.css('.button-rent')).triggerEventHandler('click', null);

    expect(rentBikeService.rentBike).toHaveBeenCalledOnceWith(component.bike);
  });

  it('should call #cancel when clicking button with class "button-cancel"', () => {
    fixture.detectChanges();

    debugElement.query(By.css('.button-cancel')).triggerEventHandler('click', null);

    expect(reservationService.cancelReservation).toHaveBeenCalledOnceWith(component.bike.id);
  });
});
