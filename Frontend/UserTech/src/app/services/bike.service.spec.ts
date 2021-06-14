import {TestBed} from '@angular/core/testing';

import {BikeService} from './bike.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BikesDTO} from '../dto/bikes-dto';
import mockBikeService from '../testing/mock-services/mockBikeService';
import {environment} from 'src/environments/environment';
import {Bike, BikeState} from '../models/bike';

describe('BikeService', () => {
  let service: BikeService;
  let httpTestingControler: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BikeService);
    httpTestingControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getRentedBikes should return bikes from server', () => {
    const bikes: BikesDTO = {
      bikes: mockBikeService.bikes
    };
    service.getRentedBikes().subscribe(result => {
      expect(result).toEqual(bikes);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/rented`);
    request.flush(bikes);
    httpTestingControler.verify();
  });

  it('#getAllBikes should return bikes from server', () => {
    const bikes: BikesDTO = {
      bikes: mockBikeService.bikes
    };
    service.getAllBikes().subscribe(result => {
      expect(result).toEqual(bikes);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes`);
    request.flush(bikes);
    httpTestingControler.verify();
  });

  it('#block should fetch to correct url', () => {
    const bike: Bike = {
      id: 'id',
      state: BikeState.Available
    };
    service.block(bike.id).subscribe();

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/blocked`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body?.id).toEqual(bike.id);
  });

  it('#unblock should fetch to correct url', () => {
    const bike: Bike = {
      id: 'id',
      state: BikeState.Available
    };
    service.unblock(bike.id).subscribe();

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/blocked/id`);
    expect(request.request.method).toEqual('DELETE');
  });
});
