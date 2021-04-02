import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import LoginData from '../models/loginData';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {AuthenticateResponseDTO} from '../dto/authenticate-response-dto';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string | null;
  private suffix = '/api/login';

  constructor(private router: Router, private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  login(loginData: LoginData): Observable<boolean> {
    const authenticateRequest = {
      login: loginData.login,
      password: loginData.password
    };

    // TODO: change way to show different message when error different than 400
    return this.http.post<AuthenticateResponseDTO>(env.apiUrl + this.suffix, authenticateRequest).pipe(
      catchError(_ => of(null)),
      map(response => {
          if (response?.token) {
            this.setToken(response.token);
            return true;
          } else {
            return false;
          }
        }
      )
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = null;
    this.router.navigate(['login']);
  }

  setAuthenticateHeader(headers = new HttpHeaders()): HttpHeaders{
    return headers.set('Authorization', 'Bearer ' + this.token);
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
}
