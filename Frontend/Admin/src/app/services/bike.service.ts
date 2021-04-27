import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BikesDTO} from '../dto/bikes-dto';
import {NewBikeDTO} from '../dto/new-bike-dto';
import {BikeDTO} from '../dto/bike-dto';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = `${env.apiUrl}/bikes`;

  constructor(private http: HttpClient) { }

  getAllBikes(): Observable<BikesDTO>{
    return this.http.get<BikesDTO>(this.baseUrl);
  }

  addBike(newBikeDTO: NewBikeDTO): Observable<BikeDTO> {
    return this.http.post<BikeDTO>(this.baseUrl, newBikeDTO);
  }

  deleteBike(bikeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bikeId}`);
  }

  blockBike(bikeId: string): Observable<BikeDTO> {
    return this.http.post<BikeDTO>(`${this.baseUrl}/blocked`, {id: bikeId});
  }

  unblockBike(bikeId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/blocked/${bikeId}`);
  }
}
