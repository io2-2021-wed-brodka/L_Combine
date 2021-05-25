import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import LoginData from '../models/loginData';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AuthenticateResponseDTO, Role} from '../dto/authenticate-response-dto';
import {tap} from 'rxjs/operators';
import {RedirectService} from './redirect.service';
import {IGNORE_ERROR_INTERCEPT} from '../constants/headers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = `${env.apiUrl}/login`;
  private token: string | null;

  constructor(private http: HttpClient,
              private redirectService: RedirectService) {
    this.token = localStorage.getItem('admin_token');
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  login(loginData: LoginData): Observable<AuthenticateResponseDTO> {
    const authenticateRequest = {
      login: loginData.login,
      password: loginData.password
    };
    const headers = new HttpHeaders().set(IGNORE_ERROR_INTERCEPT, 'true');

    return this.http.post<AuthenticateResponseDTO>(this.baseUrl, authenticateRequest, {headers}).pipe(
      tap(response => {
        if(response.role === Role.Admin)
          this.setToken(response.token);
        else
          throw new HttpErrorResponse({status: 401})
      })
    );
  }

  logout(): void {
    const headers = new HttpHeaders().set(IGNORE_ERROR_INTERCEPT, 'true');
    this.http.post<any>(`${env.apiUrl}/logout`, {}, {headers});

    localStorage.removeItem('admin_token');
    this.token = null;
    this.redirectService.redirectToLogin();
  }

  setAuthenticateHeader(headers = new HttpHeaders()): HttpHeaders {
    return headers.set('Authorization', 'Bearer ' + this.token);
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('admin_token', token);
  }
}
