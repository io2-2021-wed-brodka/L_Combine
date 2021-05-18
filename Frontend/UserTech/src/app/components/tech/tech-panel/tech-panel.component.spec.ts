import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BikeState } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';

import { TechPanelComponent } from './tech-panel.component';

describe('TechPanelComponent', () => {
  let component: TechPanelComponent;
  let fixture: ComponentFixture<TechPanelComponent>;
  let bikeService: jasmine.SpyObj<BikeService>;

  beforeEach(async () => {
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['getAllBikes'])
    await TestBed.configureTestingModule({
      declarations: [ TechPanelComponent ],
      providers: [
        {provide: BikeService, useValue: bikeServiceSpy}
      ]
    })
    .compileComponents();
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;
    bikeService.getAllBikes.and.returnValue(of({bikes: [
      {id: '1', bikeStatus: BikeState.Blocked},
      {id: '2', bikeStatus: BikeState.Available}
    ]}))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#blockedBikes and #unblockedBikes should be defined on init', ()=>{
    expect(component.blockedBikes).toBeTruthy();
    expect(component.unblockedBikes).toBeTruthy();
  });

  it('#getBikes should update bike lists', ()=>{
    component.getBikes();
    expect(component.blockedBikes.length).toEqual(1);
    expect(component.unblockedBikes.length).toEqual(1);

  })
});
