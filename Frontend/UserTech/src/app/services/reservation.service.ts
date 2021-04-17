import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {ReservedBikeDTO, ReservedBikesDTO} from '../dto/reserved-bike-dto';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = `${env.apiUrl}/bikes/reserved`;

  constructor(private http: HttpClient) { }

  getReservedBikes(): Observable<ReservedBikesDTO> {
    // TODO: return this.http.get<ReservedBikesDTO>(this.baseUrl);
    return of({
      bikes: [
        {
          id: '1',
          reservedAt: new Date(),
          reservedTill: new Date(Date.now() + 10000000000)
        }
      ]
    });
  }

  reserveBike(bikeId: string): Observable<ReservedBikeDTO> {
    return this.http.post<ReservedBikeDTO>(this.baseUrl, {id: bikeId});
  }

  cancelReservation(bikeId: string): Observable<ReservedBikeDTO> {
    return this.http.delete<ReservedBikeDTO>(`${this.baseUrl}/${bikeId}`);
  }
}
