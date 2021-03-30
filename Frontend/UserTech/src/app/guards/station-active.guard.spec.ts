import { TestBed } from '@angular/core/testing';

import { StationActiveGuard } from './station-active.guard';

describe('StationActiveGuard', () => {
  let guard: StationActiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StationActiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
