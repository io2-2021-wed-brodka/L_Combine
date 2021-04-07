import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBikeComponent } from './rent-bike.component';

describe('RentBikeComponent', () => {
  let component: RentBikeComponent;
  let fixture: ComponentFixture<RentBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentBikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
