import { Injectable } from '@angular/core';
import LoginData from './interfaces/LoginData';
import User from './interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }
  users: User[] = [{username: 'user', id: 'id1'}, {username: 'c', id: 'id2'}];
  userData: LoginData[] = [{login: 'user', password: 'password'}, {login: 'c', password: 'd'}];
}
