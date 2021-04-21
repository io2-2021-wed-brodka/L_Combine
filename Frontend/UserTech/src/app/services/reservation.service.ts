import {Injectable} from '@angular/core';
import {environment as env} from '../../environments/environment';
import {ReservedBikeDTO, ReservedBikesDTO} from '../dto/reserved-bike-dto';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = `${env.apiUrl}/bikes/reserved`;

  constructor(private http: HttpClient) { }

  getReservedBikes(): Observable<ReservedBikesDTO> {
    return this.http.get<ReservedBikesDTO>(this.baseUrl);
  }

  reserveBike(bikeId: string): Observable<ReservedBikeDTO> {
    return this.http.post<ReservedBikeDTO>(this.baseUrl, {id: bikeId});
  }

  cancelReservation(bikeId: string): Observable<ReservedBikeDTO> {
    return this.http.delete<ReservedBikeDTO>(`${this.baseUrl}/${bikeId}`);
  }
}
