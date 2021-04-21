import {TestBed} from '@angular/core/testing';
import { convertToParamMap, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BikeService } from '../services/bike.service';
import mockBikeService from '../testing/mock-services/mockBikeService';

import {BikeRentedGuard} from './bike-rented.guard';

describe('BikeRentedGuard', () => {
  let guard: BikeRentedGuard;
  
  let router: jasmine.SpyObj<Router>;

  let rightRouteSnapshotMock: any = {paramMap: convertToParamMap({id: 'id1'})};
  let wrongRouteSnapshotMock: any = {paramMap: convertToParamMap({id: 'wrong'})};

  let routeStateSnapshotMock: any =  {paramMap: convertToParamMap({})};
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    TestBed.configureTestingModule({
        providers:[
            {provide: Router, useValue: routerSpy},
            {provide: BikeService, useValue: mockBikeService}
        ]
    });
    guard = TestBed.inject(BikeRentedGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('#canActivate should return true if bike is retned',()=>{
    (guard.canActivate(rightRouteSnapshotMock, routeStateSnapshotMock) as Observable<boolean | UrlTree>).subscribe(value=>{
        expect(value).toBeTrue();
    });
  });

  it('#canActivate should call router #parseUrl function if bike is not rented',()=>{
    expect(router.parseUrl).toHaveBeenCalledTimes(0);
    (guard.canActivate(wrongRouteSnapshotMock, routeStateSnapshotMock) as Observable<boolean | UrlTree>).subscribe(value=>{
        expect(router.parseUrl).toHaveBeenCalledOnceWith('')
    });
  });

});
