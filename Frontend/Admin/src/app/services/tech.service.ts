import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TechsDTO } from '../dto/techs-dto';
import { UsersDTO } from '../dto/users-dto';

@Injectable({
  providedIn: 'root'
})
export class TechService {
  baseUrl = `${environment.apiUrl}/techs`
  constructor(private http: HttpClient) { }

  getTechs(): Observable<TechsDTO>{
    return this.http.get<TechsDTO>(this.baseUrl);
  }
}
