import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {MalfunctionsDTO} from '../dto/malfunctions-dto';
import {Malfunction} from '../models/malfunction';
import {MalfunctionDTO} from '../dto/malfunction-dto';
import {NewMalfunctionDTO} from '../dto/new-malfunction-dto';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionService {
  private baseUrl = `${environment.apiUrl}/malfunctions`;
  constructor(private http: HttpClient) {
  }

  getMalfunctions(): Observable<MalfunctionsDTO> {
    return this.http.get<MalfunctionsDTO>(this.baseUrl);
  }

  postMalfunction(malfunction: NewMalfunctionDTO): Observable<MalfunctionDTO> {
    return this.http.post<Malfunction>(this.baseUrl, malfunction);
  }

  deleteMalfunction(malfunction: MalfunctionDTO): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${malfunction.id}`);
  }
}
