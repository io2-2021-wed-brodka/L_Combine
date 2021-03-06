import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BikesDTO} from '../dto/bikes-dto';
import {Bike} from '../models/bike';
import {BikeDTO} from '../dto/bike-dto';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = `${env.apiUrl}/bikes`;

  constructor(private http: HttpClient) {
  }

  getRentedBikes(): Observable<BikesDTO> {
    return this.http.get<BikesDTO>(`${this.baseUrl}/rented`);
  }

  getAllBikes(): Observable<BikesDTO> {
    return this.http.get<BikesDTO>(this.baseUrl);
  }

  block(bikeId: string): Observable<BikeDTO> {
    return this.http.post<BikeDTO>(`${this.baseUrl}/blocked`, {id: bikeId});
  }

  unblock(bikeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/blocked/${bikeId}`);
  }
}
