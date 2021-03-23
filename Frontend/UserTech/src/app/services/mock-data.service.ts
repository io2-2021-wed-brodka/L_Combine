import { Injectable } from '@angular/core';
import LoginData from '../models/LoginData';
import { RentedBike } from '../models/rentedBike';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }
  users: User[] = [{username: 'user', id: 'id1'}, {username: 'c', id: 'id2'}];
  userData: LoginData[] = [{login: 'user', password: 'password'}, {login: 'c', password: 'd'}];
  rentedBikes: RentedBike[] = [
    {id: 'id1', rentalTimestamp: new Date(1995,11,17)}, 
    {id: 'id2', rentalTimestamp: new Date(1995,11,17)},
    {id: 'id3', rentalTimestamp: new Date(1995,11,17)}, 
    {id: 'id4', rentalTimestamp: new Date(1995,11,17)},
    {id: 'id5', rentalTimestamp: new Date(1995,11,17)}, 
    {id: 'id6', rentalTimestamp: new Date(1995,11,17)},
    {id: 'id7', rentalTimestamp: new Date(1995,11,17)}, 
    {id: 'id8', rentalTimestamp: new Date(1995,11,17)},
  ]
}
