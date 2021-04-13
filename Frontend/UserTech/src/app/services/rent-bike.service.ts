import {Injectable} from '@angular/core';
import {Bike} from '../models/bike';
import {Observable, of} from 'rxjs';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RentBikeService {
  private bikeUrl = `${env.apiUrl}/bikes`;
  private stationBikeUrl = `${env.apiUrl}/stations/bikes`;

  constructor(private http: HttpClient) { }

  rentBike(bike: Bike): Observable<boolean>{
    const rentRequest = {
      id: bike.id
    };
    return this.http.post<boolean>(`${this.bikeUrl}/rented`, rentRequest).pipe(
      map(()=>true)
    );
  }

  returnBike(bikeId: string, stationId: string): Observable<boolean> {
    const returnRequest = {
      id: bikeId
    };
    return this.http.post<boolean>(`${this.stationBikeUrl}/${stationId}`, returnRequest).pipe(
      map(()=>true)
    );
  }
}
