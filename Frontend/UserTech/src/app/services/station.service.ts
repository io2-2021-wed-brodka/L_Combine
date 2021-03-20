import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {BikeStation} from '../models/bikeStation';
import {STATIONS} from '../mocks/stationsMock';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor() { }

  // TODO: make HTTPS request for those
  getStation(stationId: number): Observable<BikeStation> {
    return of(STATIONS[stationId - 1]);
  }

  getStations(): Observable<BikeStation[]> {
    return of(STATIONS);
  }

}
