import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserStatus } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { ListBlockedUsersComponent } from './list-blocked-users.component';

describe('ListBlockedUsersComponent', () => {
  let component: ListBlockedUsersComponent;
  let fixture: ComponentFixture<ListBlockedUsersComponent>;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getBlockedUsers']);
    await TestBed.configureTestingModule({
      declarations: [ ListBlockedUsersComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    })
    .compileComponents();
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.getBlockedUsers.and.returnValue(of([{id: 'id', username: 'name', status: UserStatus.Active}]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBlockedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#users should be defined on init', ()=>{
    expect(userService.getBlockedUsers).toHaveBeenCalledTimes(1);
    expect(component.users.length).toBeTruthy();
  });
  it('#selectUser should set #selectedUser', ()=>{
    expect(component.selectedUser).toBeUndefined();
    component.selectUser(component.users[0]);
    expect(component.selectedUser).toEqual(component.users[0]);
  });
  it('#selectUser should unselect on second click', ()=>{
    component.selectUser(component.users[0]);
    component.selectUser(component.users[0]);
    expect(component.selectedUser).toBeUndefined();
  });
});
