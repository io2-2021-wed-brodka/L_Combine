import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {BikeStation, StationState} from '../models/bikeStation';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private baseUrl = env.apiUrl + '/stations';

  constructor(private http: HttpClient) {
  }

  getStation(stationId: number): Observable<BikeStation> {
    return of({id: 1, locationName: 'a', stationState: StationState.Active, bikes: []});
    // const url = '${baseUrl}/${stationId}';
    // return this.http.get<StationDTO>(url).pipe(
    //   catchError(_ => of()),
    //   map((response: StationDTO) => {
    //     return new BikeStation(response.id, response.name, StationState.Active, []);
    //   })
    // );
  }

  getStations(): Observable<BikeStation[]> {
    return of([]);
    // return this.http.get<StationsDTO>(this.baseUrl).pipe(
    //   catchError(_ => of({stations: []})),
    //   map((response: StationsDTO) => {
    //     return response.stations.map<BikeStation>(
    //       station => new BikeStation(station.id, station.name, StationState.Active, [])
    //     );
    //   })
    // );
  }

}
