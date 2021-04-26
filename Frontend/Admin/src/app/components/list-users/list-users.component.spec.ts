import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserStatus } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { ListUsersComponent } from './list-users.component';

describe('ListUsersComponent', () => {
  let component: ListUsersComponent;
  let fixture: ComponentFixture<ListUsersComponent>;
  let userService: jasmine.SpyObj<UserService>;
  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    await TestBed.configureTestingModule({
      declarations: [ ListUsersComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy}
      ]
    })
    .compileComponents();
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userService.getUsers.and.returnValue(of([{id: 'id', username: 'name', status: UserStatus.Active}]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#users should be defined on init', ()=>{
    expect(userService.getUsers).toHaveBeenCalledTimes(1);
    expect(component.users.length).toBeTruthy();
  });
});
