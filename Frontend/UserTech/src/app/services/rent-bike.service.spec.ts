import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from 'src/environments/environment';
import {BikeState} from '../models/bike';

import {RentBikeService} from './rent-bike.service';

describe('RentBikeService', () => {
  let service: RentBikeService;
  let httpTestingControler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RentBikeService);
    httpTestingControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#rentBike should make correct call to server', () => {
    const bike = {id: 'id', state: BikeState.Available};
    service.rentBike(bike).subscribe(dto => {
      expect(dto.id === bike.id).toBeTrue();
    });
    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/rented`);
    expect(request.request.body.id).toEqual(bike.id);
    request.flush({id: bike.id, bikeStatus: BikeState.Rented});
  });

  it('#removeBike should make correct call to server', () => {
    const bikeId = 'bikeId';
    const stationId = 'stationId';
    service.returnBike(bikeId, stationId).subscribe(dto => {
      expect(dto.id === bikeId).toBeTrue();
    });
    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations/${stationId}/bikes`);
    expect(request.request.body.id).toEqual(bikeId);
    request.flush({id: bikeId, bikeStatus: BikeState.Rented});
  });
});
