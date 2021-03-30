import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import LoginData from '../models/loginData';
import User from '../models/user';
import {MockDataService} from './mock-data.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: User | undefined;

  constructor(private router: Router, private mockData: MockDataService) {
    const userStr = localStorage.getItem('user');
    this.user = userStr ? JSON.parse(userStr) : userStr;
  }

  get loggedUser(): User | undefined {
    return this.user;
  }

  login(loginData: LoginData): Observable<User | undefined> {
    // fetch to server
    const found = this.mockData.userData.find(user => user.login === loginData.login && user.password === loginData.password);
    if (found) {
      this.user = this.mockData.users.find(user => user.username === loginData.login);
      localStorage.setItem('user', JSON.stringify(this.user));
      return of(this.user);
    }
    return of(undefined);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
