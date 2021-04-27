import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeViewComponent } from './bike-view.component';

@Component({selector: 'app-list-bikes'})
class ListBikesComponentStub{}

describe('BikeViewComponent', () => {
  let component: BikeViewComponent;
  let fixture: ComponentFixture<BikeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeViewComponent, ListBikesComponentStub ]
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
