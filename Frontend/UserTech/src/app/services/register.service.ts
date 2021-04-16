import {Injectable} from '@angular/core';
import {AuthenticateRequestDTO} from '../dto/authenticate-request-dto';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticateResponseDTO} from '../dto/authenticate-response-dto';
import {environment as env} from '../../environments/environment';
import {IGNORE_ERROR_INTERCEPT} from '../constants/headers';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = `${env.apiUrl}/register`;

  constructor(private http: HttpClient) { }

  register(requestDTO: AuthenticateRequestDTO): Observable<AuthenticateResponseDTO> {
    const headers = new HttpHeaders().set(IGNORE_ERROR_INTERCEPT, 'true');
    return this.http.post<AuthenticateResponseDTO>(this.baseUrl, requestDTO, {headers});
  }
}
