import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RentedBike } from '../models/rentedBike';
import { LoginService } from './login.service';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private mockService: MockDataService,
    private loginService: LoginService) { }
  
  getRentedBikes(): Observable<RentedBike[]>{
    if(!this.loginService.loggedUser)
      return of();
    //get bikes from server
    return of(this.mockService.rentedBikes);
  }
}
