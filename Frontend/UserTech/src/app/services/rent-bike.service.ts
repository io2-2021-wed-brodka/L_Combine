import {Injectable} from '@angular/core';
import {Bike} from '../models/bike';
import {Observable, of} from 'rxjs';
import {RentResult} from '../models/rentResult';

@Injectable({
  providedIn: 'root'
})
export class RentBikeService {

  constructor() { }

  rentBike(bike: Bike): Observable<RentResult>{
    return of({result: 'Ok'});
  }

  returnBike(bikeId: string, stationId: string): Observable<any> {
    return of('a');
  }
}
