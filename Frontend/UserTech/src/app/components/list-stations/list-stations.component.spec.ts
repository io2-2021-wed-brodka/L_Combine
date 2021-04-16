import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationService } from 'src/app/services/station.service';
import mockStationService from 'src/app/testing/mock-services/mockStationService';

import { ListStationsComponent } from './list-stations.component';

describe('ListStationsComponent', () => {
  let component: ListStationsComponent;
  let fixture: ComponentFixture<ListStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStationsComponent ],
      providers: [
          {provide: StationService, useValue: mockStationService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#stations defined on init', ()=>{
      expect(component.stations.length).toBeTruthy();
  })
  //TODO: testy id w routerLinkach
});
