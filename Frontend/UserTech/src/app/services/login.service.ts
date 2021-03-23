import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import LoginData from './../models/LoginData';
import User from './../models/User';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private mockData: MockDataService) { }
  loggedUser?: User = undefined;
  login(loginData: LoginData): Observable<User | undefined>{
    //fetch to server
    const found = this.mockData.userData.find(user=>user.login==loginData.login && user.password == loginData.password);
    if(found){
      this.loggedUser = this.mockData.users.find(user=>user.username == loginData.login);
      return of(this.loggedUser);
    }
    return of(undefined);
  }
}
