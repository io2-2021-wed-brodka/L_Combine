import {TestBed} from '@angular/core/testing';

import {BikeService} from './bike.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BikesDTO} from '../dto/bikes-dto';
import {environment} from 'src/environments/environment';
import {BikeState} from '../models/bike';

describe('BikeService', () => {
  let service: BikeService;
  let httpTestingControler: HttpTestingController;

  const bikes: BikesDTO = {
    bikes: [{
      id: 'id',
      status: BikeState.Available
    }]
  };

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

  it('#getAllBikes should return bikes from server', () => {
    service.getAllBikes().subscribe(result => {
      expect(result).toEqual(bikes);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes`);
    request.flush(bikes);
    httpTestingControler.verify();
  });

  it('#addBike should post bike to server', () => {
    service.addBike({stationId: 'a'}).subscribe(result =>
      expect(result).toEqual(bikes.bikes[0])
    );

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes`);
    expect(request.request.method).toEqual('POST');
    request.flush(bikes.bikes[0]);
    httpTestingControler.verify();
  });

  it('#deleteBike should delete bike from server', () => {
    service.deleteBike('a').subscribe(result =>
      expect(result).toEqual({})
    );

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/a`);
    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpTestingControler.verify();
  });

  it('#blockBike should post bike to server', () => {
    service.blockBike('a').subscribe(result =>
      expect(result).toEqual(bikes.bikes[0])
    );

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/blocked`);
    expect(request.request.method).toEqual('POST');
    request.flush(bikes.bikes[0]);
    httpTestingControler.verify();
  });

  it('#unblockBike should delete bike from server', () => {
    service.unblockBike('a').subscribe(result =>
      expect(result).toEqual({})
    );

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/blocked/a`);
    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpTestingControler.verify();
  });
});
