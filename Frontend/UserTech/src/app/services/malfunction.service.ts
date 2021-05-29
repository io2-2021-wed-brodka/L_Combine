import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MalfunctionsDTO } from '../dto/malfunctions-dto';
import { UserDTO } from '../dto/user-dto';
import { Malfunction } from '../models/malfunction';
import { NewMalfunction } from '../models/newMalfunction';
import { userFromDTO } from '../utils/dto-utils';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionService {
  private baseUrl = environment.apiUrl + '/malfunctions';
  constructor(private http: HttpClient) { }

  getMalfunctions() : Observable<MalfunctionsDTO> {
    return this.http.get<MalfunctionsDTO>(this.baseUrl);
  }

  postMalfunction(malfunction: NewMalfunction): Observable<Malfunction>{
    return this.http.post<Malfunction>(this.baseUrl, malfunction);
  }

  deleteMalfunction(malfunction: Malfunction): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${malfunction.id}`);
  }
}
