import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {StationsDTO} from '../dto/stations-dto';
import {BikesDTO} from '../dto/bikes-dto';
import {NewStationDTO} from '../dto/new-station-dto';
import {StationDTO} from '../dto/station-dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private baseUrl = `${env.apiUrl}/stations`;

  constructor(private http: HttpClient) {
  }

  getStations(): Observable<StationsDTO> {
    return this.http.get<StationsDTO>(this.baseUrl);
  }

  // getStationBikes(stationId: string): Observable<BikesDTO> {
  //   const url = `${this.baseUrl}/${stationId}/bikes`;
  //   return this.http.get<BikesDTO>(url);
  // }

  getStationBikes(stationId: string): Observable<BikesDTO> {
    return this.http.get<BikesDTO>(`${env.apiUrl}/bikes`).pipe(
      map(bikes => {
        return {bikes: bikes.bikes.filter(bike => bike.station?.id === stationId)};
      })
    );
  }

  addStation(newStation: NewStationDTO): Observable<StationDTO> {
    return this.http.post<StationDTO>(this.baseUrl, newStation);
  }

  deleteStation(stationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${stationId}`);
  }

  blockStation(stationId: string): Observable<StationDTO> {
    return this.http.post<StationDTO>(`${this.baseUrl}/blocked`, {id: stationId});
  }

  unblockStation(stationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/blocked/${stationId}`);
  }
}
