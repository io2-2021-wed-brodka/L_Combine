import { Injectable } from '@angular/core';
import LoginData from './interfaces/LoginData';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private mockData: MockDataService) { }

  login = (loginData: LoginData)=>{
    //fetch to server
    return this.mockData.getUserData().find(user=>user.login==loginData.login && user.password == loginData.password)? true: false;
  }
}
