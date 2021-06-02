import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from 'src/environments/environment';
import mockStationService from '../testing/mock-services/mockStationService';

import {StationService} from './station.service';
import {BikesDTO} from '../dto/bikes-dto';
import mockBikeService from '../testing/mock-services/mockBikeService';
import { StationState } from '../models/bikeStation';
import { StationDTO } from '../dto/station-dto';

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

  it('#getStations should fetch with correct url', () => {
    const stations = {
      stations: mockStationService.stations
    };

    service.getStations().subscribe();

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations`);
    expect(request.request.method).toEqual('GET');
  });

  it('#getStationBikes should return bike list from server', () => {
    const bikes: BikesDTO = {
      bikes: mockBikeService.bikes
    };

    const stationId = 'id';
    service.getStationBikes(stationId).subscribe(result => {
      expect(result.bikes).toEqual(bikes.bikes);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes`);
    request.flush(bikes);
    httpTestingControler.verify();
  });

  it('#addStation should add station to server', () => {
    const station = { id: 'id', status: StationState.Active, bikesLimit: 0, name: '', activeBikesCount: 0  };

    service.addStation({name: 'a'}).subscribe(result => {
      expect(result).toEqual(station);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations`);
    expect(request.request.method).toEqual('POST');
    request.flush(station);
    httpTestingControler.verify();
  });

  it('#deleteStation should remove station from server', () => {
    service.deleteStation('a').subscribe(result => {
      expect(result).toEqual({});
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations/a`);
    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpTestingControler.verify();
  });

  it('#blockStation should post to server', () => {
    const station = { id: 'id', status: StationState.Active, bikesLimit: 0, name: '', activeBikesCount: 0  };

    service.blockStation('a').subscribe(result => {
      expect(result).toEqual(station);
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations/blocked`);
    expect(request.request.method).toEqual('POST');
    request.flush(station);
    httpTestingControler.verify();
  });

  it('#unblockStation should delete from server', () => {
    service.unblockStation('a').subscribe(result => {
      expect(result).toEqual({});
    });

    const request = httpTestingControler.expectOne(`${environment.apiUrl}/stations/blocked/a`);
    expect(request.request.method).toEqual('DELETE');
    request.flush({});
    httpTestingControler.verify();
  });
});
