import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BikesDTO} from '../dto/bikes-dto';
@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = `${env.apiUrl}/bikes`;

  constructor(private http: HttpClient) { }

  getAllBikes(): Observable<BikesDTO>{
    return this.http.get<BikesDTO>(`${this.baseUrl}`);
  }
}
