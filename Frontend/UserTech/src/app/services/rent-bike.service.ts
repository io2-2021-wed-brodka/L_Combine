import {Injectable} from '@angular/core';
import {Bike} from '../models/bike';
import {Observable} from 'rxjs';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BikeDTO} from '../dto/bike-dto';

@Injectable({
  providedIn: 'root'
})
export class RentBikeService {
  private bikeUrl = `${env.apiUrl}/bikes`;
  private stationUrl = `${env.apiUrl}/stations`;

  constructor(private http: HttpClient) { }

  rentBike(bike: Bike): Observable<BikeDTO>{
    const rentRequest = {
      id: bike.id
    };
    return this.http.post<BikeDTO>(`${this.bikeUrl}/rented`, rentRequest);
  }

  returnBike(bikeId: string, stationId: string): Observable<BikeDTO> {
    const returnRequest = {
      id: bikeId
    };
    return this.http.post<BikeDTO>(`${this.stationUrl}/${stationId}/bikes`, returnRequest);
  }
}
