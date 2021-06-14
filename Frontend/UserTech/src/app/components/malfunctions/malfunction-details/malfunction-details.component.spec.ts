import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MalfunctionState } from 'src/app/models/malfunction';

import { MalfunctionDetailsComponent } from './malfunction-details.component';

describe('MalfunctionDetailsComponent', () => {
  let component: MalfunctionDetailsComponent;
  let fixture: ComponentFixture<MalfunctionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MalfunctionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunctionDetailsComponent);
    component = fixture.componentInstance;
    component.malfunction = {
      id: 'id',
      reportingUserId: 'id',
      bikeId: 'id',
      description: 'description',
      state: MalfunctionState.Waiting,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
