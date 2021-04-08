import {TestBed} from '@angular/core/testing';

import {BikeRentedGuard} from './bike-rented.guard';

describe('BikeRentedGuard', () => {
  let guard: BikeRentedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BikeRentedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
