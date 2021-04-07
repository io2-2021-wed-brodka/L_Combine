import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RentedBikeDetailsComponent} from './rented-bike-details.component';

describe('ReturnBikeComponent', () => {
  let component: RentedBikeDetailsComponent;
  let fixture: ComponentFixture<RentedBikeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentedBikeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedBikeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
