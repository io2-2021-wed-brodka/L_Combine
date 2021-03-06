import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from 'src/environments/environment';
import mockBikeService from '../testing/mock-services/mockBikeService';
import mockStationService from '../testing/mock-services/mockStationService';

import {StationService} from './station.service';

describe('StationService', () => {
  let service: StationService;
  let httpTestingControler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(StationService);
    httpTestingControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getStations should return station list from server', () => {
    const stations = {
      stations: mockStationService.stations
    };
    service.getStations().subscribe(result => {
      expect(result.stations).toEqual(stations.stations);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations/active`);
    request.flush(stations);
    httpTestingControler.verify();
  });
  it('#getStationBikes should return bike list from server', () => {
    const bikes = {
      bikes: mockBikeService.bikes
    };
    const stationId = 'id';
    service.getStationBikes(stationId).subscribe(result => {
      expect(result.bikes).toEqual(bikes.bikes);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations/${stationId}/bikes`);
    request.flush(bikes);
    httpTestingControler.verify();
  });
});
