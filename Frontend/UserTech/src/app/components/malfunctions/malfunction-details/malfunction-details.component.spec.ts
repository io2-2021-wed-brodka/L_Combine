import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BikeState } from 'src/app/models/bike';
import { MalfunctionState } from 'src/app/models/malfunction';
import { BikeService } from 'src/app/services/bike.service';
import { MalfunctionService } from 'src/app/services/malfunction.service';
import { NotificationService } from 'src/app/services/notification.service';

import { MalfunctionDetailsComponent } from './malfunction-details.component';

describe('MalfunctionDetailsComponent', () => {
  let component: MalfunctionDetailsComponent;
  let fixture: ComponentFixture<MalfunctionDetailsComponent>;
  let bikeService: jasmine.SpyObj<BikeService>;
  let malfunctionService: jasmine.SpyObj<MalfunctionService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const malfunctionServiceSpy = jasmine.createSpyObj('MalfunctionService', ['deleteMalfunction']);
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['block', 'unblock']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    await TestBed.configureTestingModule({
      declarations: [ MalfunctionDetailsComponent ],
      providers: [
        {provide: MalfunctionService, useValue: malfunctionServiceSpy},
        {provide: BikeService, useValue: bikeServiceSpy},
        {provide: NotificationService, useValue: notificationServiceSpy},
      ]
    })
    .compileComponents();

    malfunctionService = TestBed.inject(MalfunctionService) as jasmine.SpyObj<MalfunctionService>;
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;

    malfunctionService.deleteMalfunction.and.returnValue(of({}));
    bikeService.unblock.and.returnValue(of({}));
    bikeService.block.and.returnValue(of({id: "", status: BikeState.Available}));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunctionDetailsComponent);
    component = fixture.componentInstance;
    spyOn(component.malfunctionChanged, 'emit');
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

  it('#isInReperation should return true if malfunction is in reparation', ()=>{
    component.malfunction.state = MalfunctionState.Waiting;
    expect(component.isInReparation()).toBeFalse();
    component.malfunction.state = MalfunctionState.InReparation;
    expect(component.isInReparation()).toBeTrue();
  });

  it('#isWaiting should return true if malfunction is waiting for acceptation', ()=>{
    component.malfunction.state = MalfunctionState.InReparation;
    expect(component.isWaiting()).toBeFalse();
    component.malfunction.state = MalfunctionState.Waiting;
    expect(component.isWaiting()).toBeTrue();
  });

  it('#isRented should return true if bike is rented', ()=>{
    component.malfunction.state = MalfunctionState.Waiting;
    expect(component.isRented()).toBeFalse();
    component.malfunction.state = MalfunctionState.BikeRented;
    expect(component.isRented()).toBeTrue();
  });
  
  it('#cancelMalfunction should delete malfunction',()=>{
    component.cancelMalfunction();
    expect(malfunctionService.deleteMalfunction).toHaveBeenCalledTimes(1);
  });

  it('#cancelMalfunction should call notificationService',()=>{
    component.cancelMalfunction();
    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('#cancelMalfunction should emit #malfunctionChanged event',()=>{
    component.cancelMalfunction();
    expect(component.malfunctionChanged.emit).toHaveBeenCalledTimes(1);
  });
  
  it('#acceptMalfunction should block bike',()=>{
    component.acceptMalfunction();
    expect(bikeService.block).toHaveBeenCalledTimes(1);
  });

  it('#acceptMalfunction should call notificationService',()=>{
    component.acceptMalfunction();
    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('#acceptMalfunction should emit #malfunctionChanged event',()=>{
    component.acceptMalfunction();
    expect(component.malfunctionChanged.emit).toHaveBeenCalledTimes(1);
  });
  
  it('#repairBike should delete malfunction',()=>{
    component.repairBike();
    expect(malfunctionService.deleteMalfunction).toHaveBeenCalledTimes(1);
  });

  it('#repairBike should unblock bike',()=>{
    component.repairBike();
    expect(bikeService.unblock).toHaveBeenCalledTimes(1);
  });

  it('#repairBike should call notificationService',()=>{
    component.repairBike();
    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });

  it('#repairBike should emit #malfunctionChanged event',()=>{
    component.repairBike();
    expect(component.malfunctionChanged.emit).toHaveBeenCalledTimes(1);
  });
});
