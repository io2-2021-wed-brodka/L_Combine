import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRentedBikesComponent } from './list-rented-bikes.component';

describe('ListRentedBikesComponent', () => {
  let component: ListRentedBikesComponent;
  let fixture: ComponentFixture<ListRentedBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRentedBikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRentedBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
