import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BikeState } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';

import { ListBikesComponent } from './list-bikes.component';

describe('ListBikesComponent', () => {
  let component: ListBikesComponent;
  let fixture: ComponentFixture<ListBikesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBikesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#selectBike should set #selectedTech', ()=>{
    component.bikes = [{id: 'id', state: BikeState.Blocked}]
    expect(component.selectedBike).toBeUndefined();
    component.selectBike(component.bikes[0]);
    expect(component.selectedBike).toEqual(component.bikes[0]);
  });
});
