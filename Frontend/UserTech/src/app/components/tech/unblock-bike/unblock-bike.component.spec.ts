import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BikeState } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';
import { NotificationService } from 'src/app/services/notification.service';

import { UnblockBikeComponent } from './unblock-bike.component';

describe('UnblockBikeComponent', () => {
  let component: UnblockBikeComponent;
  let fixture: ComponentFixture<UnblockBikeComponent>;
  let notification: jasmine.SpyObj<NotificationService>;
  let bikeService: jasmine.SpyObj<BikeService>;
  
  beforeEach(async () => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['unblock']);
    
    await TestBed.configureTestingModule({
      declarations: [ UnblockBikeComponent ],
      providers: [
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: BikeService, useValue: bikeServiceSpy},
      ]
    })
    .compileComponents();
    notification = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;
    bikeService.unblock.and.returnValue(of({}))
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(UnblockBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('#unblock should send notification on success', ()=>{
    expect(notification.success).toHaveBeenCalledTimes(0);
    component.unblock();
    expect(notification.success).toHaveBeenCalledTimes(1);
  });
});
