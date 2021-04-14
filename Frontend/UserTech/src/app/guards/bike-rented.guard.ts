import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BikeService} from '../services/bike.service';

@Injectable({
  providedIn: 'root'
})
export class BikeRentedGuard implements CanActivate {
  constructor(private router: Router, private bikeService: BikeService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const bikeId = route.paramMap.get('id') || '';
    return this.bikeService.getRentedBikes().pipe(
      map(bikes => {
        if (bikes?.bikes?.find(bike => bike.id === bikeId)) {
          return true;
        }
        else {
          return this.router.parseUrl('');
        }
      })
    );
  }
}
