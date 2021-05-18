import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BikeState } from 'src/app/models/bike';
import { BikeService } from 'src/app/services/bike.service';
import { NotificationService } from 'src/app/services/notification.service';

import { BlockBikeComponent } from './block-bike.component';

describe('BlockBikeComponent', () => {
  let component: BlockBikeComponent;
  let fixture: ComponentFixture<BlockBikeComponent>;
  let notification: jasmine.SpyObj<NotificationService>;
  let bikeService: jasmine.SpyObj<BikeService>;
  
  beforeEach(async () => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    const bikeServiceSpy = jasmine.createSpyObj('BikeService', ['block']);
    
    await TestBed.configureTestingModule({
      declarations: [ BlockBikeComponent ],
      providers: [
        {provide: NotificationService, useValue: notificationServiceSpy},
        {provide: BikeService, useValue: bikeServiceSpy},
      ]
    })
    .compileComponents();
    notification = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    bikeService = TestBed.inject(BikeService) as jasmine.SpyObj<BikeService>;
    bikeService.block.and.returnValue(of({id: 'id', bikeStatus: BikeState.Blocked}))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockBikeComponent);
    component = fixture.componentInstance;
    component.bike = {id: 'id', state: BikeState.Available};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#block should send notification on success', ()=>{
    expect(notification.success).toHaveBeenCalledTimes(0);
    component.block();
    expect(notification.success).toHaveBeenCalledTimes(1);
  });
});
