import { Injectable } from '@angular/core';
import LoginData from './interfaces/LoginData';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }
  userData: LoginData[] = [{login: 'user', password: 'password'}, {login: 'c', password: 'd'}];
  getUserData = () => {
    return this.userData;
  }
}
