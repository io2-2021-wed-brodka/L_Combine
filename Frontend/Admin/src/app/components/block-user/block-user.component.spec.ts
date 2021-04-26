import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserStatus } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { UserService } from 'src/app/services/user.service';

import { BlockUserComponent } from './block-user.component';

describe('BlockUserComponent', () => {
  let component: BlockUserComponent;
  let fixture: ComponentFixture<BlockUserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let redirectService: jasmine.SpyObj<RedirectService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['blockUser']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['reload']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    await TestBed.configureTestingModule({
      declarations: [ BlockUserComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: RedirectService, useValue: redirectServiceSpy},
        {provide: NotificationService, useValue: notificationServiceSpy},
      ]
    })
    .compileComponents();
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirectService = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    userService.blockUser.and.returnValue(of({id: 'id', name: 'name'}));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUserComponent);
    component = fixture.componentInstance;
    component.user = {id: 'id', username: 'userName', status: UserStatus.Active}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#blockUser should call service function', ()=>{
    expect(userService.blockUser).toHaveBeenCalledTimes(0);
    component.blockUser();
    expect(userService.blockUser).toHaveBeenCalledWith(component.user);
  });
  it('#blockUser should reload page', ()=>{
    expect(redirectService.reload).toHaveBeenCalledTimes(0);
    component.blockUser();
    expect(redirectService.reload).toHaveBeenCalledTimes(1);
  });
  it('#blockUser should send notification', ()=>{
    expect(notificationService.success).toHaveBeenCalledTimes(0);
    component.blockUser();
    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });
});
