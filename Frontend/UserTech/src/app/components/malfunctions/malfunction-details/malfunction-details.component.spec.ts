import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MalfunctionState } from 'src/app/models/malfunction';
import { BikeService } from 'src/app/services/bike.service';
import { MalfunctionService } from 'src/app/services/malfunction.service';

import { MalfunctionDetailsComponent } from './malfunction-details.component';

describe('MalfunctionDetailsComponent', () => {
  let component: MalfunctionDetailsComponent;
  let fixture: ComponentFixture<MalfunctionDetailsComponent>;
  let bikeService: jasmine.SpyObj<BikeService>;
  let malfunctionService: jasmine.SpyObj<MalfunctionService>;

  beforeEach(async () => {
    const malfunctionServiceSpy = jasmine.createSpyObj('MalfunctionService', ['deleteMalfunction']);
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['block']);
    await TestBed.configureTestingModule({
      declarations: [ MalfunctionDetailsComponent ],
      providers: [
        {provide: MalfunctionService, useValue: malfunctionServiceSpy},
        {provide: BikeService, useValue: bikeServiceSpy},
      ]
    })
    .compileComponents();

    malfunctionService = TestBed.inject(MalfunctionService) as jasmine.SpyObj<MalfunctionService>;
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;

    malfunctionService.deleteMalfunction.and.returnValue(of());

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
