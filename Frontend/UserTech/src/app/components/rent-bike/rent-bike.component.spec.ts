import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {BikeState} from 'src/app/models/bike';
import {NotificationService} from 'src/app/services/notification.service';
import {RedirectService} from 'src/app/services/redirect.service';
import {RentBikeService} from 'src/app/services/rent-bike.service';

import {RentBikeComponent} from './rent-bike.component';
import {ReservationService} from '../../services/reservation.service';
import {StationState} from '../../models/bikeStation';

describe('RentBikeComponent', () => {
  let component: RentBikeComponent;
  let fixture: ComponentFixture<RentBikeComponent>;
  let redirect: jasmine.SpyObj<RedirectService>;
  let notification: jasmine.SpyObj<NotificationService>;
  let rentBike: jasmine.SpyObj<RentBikeService>;
  let reservation: jasmine.SpyObj<ReservationService>;

  beforeEach(async () => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['redirectToHome']);
    const rentBikeServiceSpy = jasmine.createSpyObj('RentBikeService', ['rentBike']);
    const reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['reserveBike']);

    await TestBed.configureTestingModule({
      declarations: [RentBikeComponent],
      providers: [
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: RedirectService, useValue: redirectServiceSpy},
        {provide: RentBikeService, useValue: rentBikeServiceSpy},
        {provide: ReservationService, useValue: reservationServiceSpy}
      ]
    }).compileComponents();
    notification = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirect = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    rentBike = TestBed.inject(RentBikeService) as jasmine.SpyObj<RentBikeService>;
    reservation = TestBed.inject(ReservationService) as jasmine.SpyObj<ReservationService>;

    rentBike.rentBike.and.returnValue(of({id: 'id', status: BikeState.Available}));
    reservation.reserveBike.and.returnValue(of({
      id: '1',
      station: {id: '1', status: StationState.Active, name: 'a', activeBikesCount: 1},
      reservedAt: new Date().toString(),
      reservedTill: new Date().toString()
    }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBikeComponent);
    component = fixture.componentInstance;
    component.bike = {id: 'id', state: BikeState.Available};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#rent should should rent bike', () => {
    expect(rentBike.rentBike).toHaveBeenCalledTimes(0);
    component.rent();
    expect(rentBike.rentBike).toHaveBeenCalledTimes(1);
  });

  it('#rent should redirect home', () => {
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
    component.rent();
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(1);
  });

  it('#rent should send notification', () => {
    expect(notification.success).toHaveBeenCalledTimes(0);
    component.rent();
    expect(notification.success).toHaveBeenCalledTimes(1);
  });

  it('should call #rent function on button click', () => {
    expect(rentBike.rentBike).toHaveBeenCalledTimes(0);
    fixture.debugElement.query(By.css('.button-rent')).triggerEventHandler('click', null);
    expect(rentBike.rentBike).toHaveBeenCalledTimes(1);
  });

  it('#reserve should should reserve bike', () => {
    expect(reservation.reserveBike).toHaveBeenCalledTimes(0);
    component.reserve();
    expect(reservation.reserveBike).toHaveBeenCalledTimes(1);
  });

  it('#reserve should redirect home', () => {
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(0);
    component.reserve();
    expect(redirect.redirectToHome).toHaveBeenCalledTimes(1);
  });

  it('#reserve should send notification', () => {
    expect(notification.success).toHaveBeenCalledTimes(0);
    component.reserve();
    expect(notification.success).toHaveBeenCalledTimes(1);
  });

  it('should call #reserve function on button click', () => {
    expect(reservation.reserveBike).toHaveBeenCalledTimes(0);
    fixture.debugElement.query(By.css('.button-reserve')).triggerEventHandler('click', null);
    expect(reservation.reserveBike).toHaveBeenCalledTimes(1);
  });
});

