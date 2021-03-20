import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStationBikesComponent } from './list-station-bikes.component';

describe('ListStationBikesComponent', () => {
  let component: ListStationBikesComponent;
  let fixture: ComponentFixture<ListStationBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStationBikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
