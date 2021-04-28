import {TestBed} from '@angular/core/testing';

import {ReservationService} from './reservation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment as env} from '../../environments/environment';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpController: HttpTestingController;

  const bikeId = '1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ReservationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getReservedBikes should call #get on endpoint', () => {
    service.getReservedBikes().subscribe();

    const request = httpController.expectOne(`${env.apiUrl}/bikes/reserved`);
    expect(request.request.method).toEqual('GET');
  });

  it('#reserveBike should call #post on endpoint', () => {
    service.reserveBike(bikeId).subscribe();

    const request = httpController.expectOne(`${env.apiUrl}/bikes/reserved`);
    expect(request.request.method).toEqual('POST');
  });

  it('#reserveBike should send provided data', () => {
    service.reserveBike(bikeId).subscribe();

    const request = httpController.match(_ => true)[0];
    expect(request.request.body).toEqual({id: bikeId});
  });

  it('#cancelReservation should call #delete on endpoint', () => {
    service.cancelReservation(bikeId).subscribe();

    const request = httpController.expectOne(`${env.apiUrl}/bikes/reserved/${bikeId}`);
    expect(request.request.method).toEqual('DELETE');
  });
});
