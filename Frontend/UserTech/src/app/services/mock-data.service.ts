import {Injectable} from '@angular/core';
import LoginData from '../models/loginData';
import {RentedBike} from '../models/rentedBike';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }
  users: User[] = [{username: 'user', id: 'id1'}, {username: 'c', id: 'id2'}];
  userData: LoginData[] = [{login: 'user', password: 'password'}, {login: 'c', password: 'd'}];
  rentedBikes: RentedBike[] = [
    {id: '1', rentalTimestamp: new Date(1995, 11, 17)},
    {id: '2', rentalTimestamp: new Date(1995, 11, 17)},
    {id: '3', rentalTimestamp: new Date(1995, 11, 17)},
    {id: '4', rentalTimestamp: new Date(1995, 11, 17)},
    {id: '5', rentalTimestamp: new Date(1995, 11, 17)},
    {id: '6', rentalTimestamp: new Date(1995, 11, 17)},
    {id: '7', rentalTimestamp: new Date(1995, 11, 17)},
    {id: '8', rentalTimestamp: new Date(1995, 11, 17)},
  ];
}
