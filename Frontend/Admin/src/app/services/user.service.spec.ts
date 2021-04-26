import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { UserDto } from '../dto/user-dto';
import { UsersDto } from '../dto/users-dto';
import { UserStatus } from '../models/user';

import { UserService } from './user.service';

describe('UserServiceService', () => {
  let service: UserService;
  let httpControler: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getUsers should fetch with correct url', ()=>{
    const data : UsersDto = {
      users: [{
      id: 'id',
      name: 'name'
    }]};
    service.getUsers().subscribe(result=>
      expect(result.length).toEqual(data.users.length)
    );
    const responseAll = httpControler.expectOne(`${environment.apiUrl}/users`);
    const responseBlocked = httpControler.expectOne(`${environment.apiUrl}/users/blocked`);
    responseAll.flush(data);
    responseBlocked.flush({users: []});
    httpControler.verify();
  });
  it('#getUsers should attach to user correct state', ()=>{
      const data : UsersDto = {
        users: [{
        id: 'id1',
        name: 'blocked'
      },{
        id: 'id2',
        name: 'active'
      }]};
      service.getUsers().subscribe(result=>{
        expect(result[0].status).toEqual(UserStatus.Blocked)
        expect(result[1].status).toEqual(UserStatus.Active)
      });
      const responseAll = httpControler.expectOne(`${environment.apiUrl}/users`);
      const responseBlocked = httpControler.expectOne(`${environment.apiUrl}/users/blocked`);
      responseAll.flush(data);
      responseBlocked.flush({users: [data.users[0]]});
      httpControler.verify();
  });
});
