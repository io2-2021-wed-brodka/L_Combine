import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StationViewComponent} from './station-view.component';
import {Component} from '@angular/core';

@Component({selector: 'app-list-stations'})
class ListStationsComponentStub{}

@Component({selector: 'app-list-station-bikes'})
class ListStationBikesComponentStub{}

describe('StationViewComponent', () => {
  let component: StationViewComponent;
  let fixture: ComponentFixture<StationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationViewComponent, ListStationBikesComponentStub, ListStationsComponentStub]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
