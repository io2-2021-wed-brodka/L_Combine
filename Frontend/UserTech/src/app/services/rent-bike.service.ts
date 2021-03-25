import { Injectable } from '@angular/core';
import {Bike} from "../models/bike";
import {Observable, of} from "rxjs";
import {RentResult} from "../models/rentResult";

@Injectable({
  providedIn: 'root'
})
export class RentBikeService {

  constructor() { }

  rent(bike: Bike): Observable<RentResult>{
    return of({result: 'Ok'});
  }
}
