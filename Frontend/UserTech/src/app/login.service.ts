import { Injectable } from '@angular/core';
import LoginData from './interfaces/LoginData';
import User from './interfaces/User';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private mockData: MockDataService) { }
  loggedUser?: User = undefined;
  login = (loginData: LoginData)=>{
    //fetch to server
    const found = this.mockData.userData.find(user=>user.login==loginData.login && user.password == loginData.password);
    if(found)
      this.loggedUser = this.mockData.users.find(user=>user.username == loginData.login);
    return found;
  }
}
