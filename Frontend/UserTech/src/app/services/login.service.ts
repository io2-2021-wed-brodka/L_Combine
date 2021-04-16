import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import LoginData from '../models/loginData';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AuthenticateResponseDTO} from '../dto/authenticate-response-dto';
import {tap} from 'rxjs/operators';
import {RedirectService} from './redirect.service';
import {IGNORE_ERROR_INTERCEPT} from '../constants/headers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = `${env.apiUrl}/login`;
  private token: string | null;

  constructor(private router: Router, private http: HttpClient,
              private redirectService: RedirectService) {
    this.token = localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  login(loginData: LoginData): Observable<AuthenticateResponseDTO> {
    const authenticateRequest = {
      login: loginData.login,
      password: loginData.password
    };

    return this.http.post<AuthenticateResponseDTO>(this.baseUrl, authenticateRequest,
      {headers: new HttpHeaders(IGNORE_ERROR_INTERCEPT)}).pipe(
        tap(response => {
          this.setToken(response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = null;
    this.redirectService.redirectToLogin();
  }

  setAuthenticateHeader(headers = new HttpHeaders()): HttpHeaders {
    return headers.set('Authorization', 'Bearer ' + this.token);
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
}
