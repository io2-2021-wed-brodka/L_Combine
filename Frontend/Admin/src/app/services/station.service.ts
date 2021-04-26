import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {StationsDTO} from '../dto/stations-dto';
import {BikesDTO} from '../dto/bikes-dto';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private baseUrl = `${env.apiUrl}/stations`;

  constructor(private http: HttpClient) {
  }

  getStations(): Observable<StationsDTO> {
    return this.http.get<StationsDTO>(`${this.baseUrl}/active`);
  }

  getStationBikes(stationId: string): Observable<BikesDTO> {
    const url = `${this.baseUrl}/${stationId}/bikes`;
    return this.http.get<BikesDTO>(url);
  }
}
