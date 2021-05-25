import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {BikeState} from 'src/app/models/bike';
import {BikeService} from 'src/app/services/bike.service';

import {ListBikesComponent} from './list-bikes.component';

describe('ListBikesComponent', () => {
  let component: ListBikesComponent;
  let fixture: ComponentFixture<ListBikesComponent>;
  let bikeService: jasmine.SpyObj<BikeService>;
  beforeEach(async () => {
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['getAllBikes']);
    await TestBed.configureTestingModule({
      declarations: [ ListBikesComponent ],
      providers:[
        {provide: BikeService, useValue: bikeServiceSpy}
      ]
    })
    .compileComponents();
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;
    bikeService.getAllBikes.and.returnValue(of({bikes: [{id: 'id', status: BikeState.Available}]}))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#bikes should be defined on init', ()=>{
    expect(component.bikes.length).toEqual(1);
  });

  it('#getBikes should call service funtion', ()=>{
    const callsCount = bikeService.getAllBikes.calls.count();
    component.getBikes();
    expect(bikeService.getAllBikes).toHaveBeenCalledTimes(callsCount + 1);
  });
});
