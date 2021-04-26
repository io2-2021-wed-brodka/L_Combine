import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeViewComponent } from './bike-view.component';

describe('BikeViewComponent', () => {
  let component: BikeViewComponent;
  let fixture: ComponentFixture<BikeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
