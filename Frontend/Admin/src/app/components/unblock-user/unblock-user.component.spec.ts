import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserStatus } from 'src/app/models/user';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { UserService } from 'src/app/services/user.service';

import { UnblockUserComponent } from './unblock-user.component';

describe('UnblockUserComponent', () => {
  let component: UnblockUserComponent;
  let fixture: ComponentFixture<UnblockUserComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let redirectService: jasmine.SpyObj<RedirectService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['unblockUser']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['reload']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    await TestBed.configureTestingModule({
      declarations: [ UnblockUserComponent ],
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
    userService.unblockUser.and.returnValue(of({id: 'id', name: 'name'}));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnblockUserComponent);
    component = fixture.componentInstance;
    component.user = {id: 'id', username: 'userName', status: UserStatus.Active}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#unblockUser should call service function', ()=>{
    expect(userService.unblockUser).toHaveBeenCalledTimes(0);
    component.unblockUser();
    expect(userService.unblockUser).toHaveBeenCalledWith(component.user);
  });
  it('#unblockUser should reload page', ()=>{
    expect(redirectService.reload).toHaveBeenCalledTimes(0);
    component.unblockUser();
    expect(redirectService.reload).toHaveBeenCalledTimes(1);
  });
  it('#unblockUser should send notification', ()=>{
    expect(notificationService.success).toHaveBeenCalledTimes(0);
    component.unblockUser();
    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });
});
