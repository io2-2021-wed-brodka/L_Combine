import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGNORE_ERROR_INTERCEPT } from '../constants/headers';
import { NewTechDTO } from '../dto/new-tech-dto';
import { TechDTO } from '../dto/tech-dto';
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

  addTech(tech: NewTechDTO): Observable<TechDTO>{
    const headers = new HttpHeaders().set(IGNORE_ERROR_INTERCEPT, 'true');
    return this.http.post<TechDTO>(this.baseUrl, tech, {headers});
  }  

  deleteTech(techId: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${techId}`);
  }
}
