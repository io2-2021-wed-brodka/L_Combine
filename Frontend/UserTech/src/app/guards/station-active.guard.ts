import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StationService} from '../services/station.service';
import {map} from 'rxjs/operators';
import {StationState} from '../models/bikeStation';

@Injectable({
  providedIn: 'root'
})
export class StationActiveGuard implements CanActivate {
  constructor(private  router: Router, private stationService: StationService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const stationId = +(route.paramMap.get('id') || '-1');
    return this.stationService.getStation(stationId).pipe(
      map(station => {
        if (station?.stationState === StationState.Active) {
          return true;
        }
        else {
          return this.router.parseUrl('');
        }
      })
    );
  }
}
