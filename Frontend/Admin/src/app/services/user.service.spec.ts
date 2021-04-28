import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from 'src/environments/environment';
import {UsersDTO} from '../dto/users-dto';
import {UserStatus} from '../models/user';

import {UserService} from './user.service';

describe('UserService', () => {
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

  it('#getActiveUsers should fetch with correct url', ()=>{
    const data : UsersDTO = {
      users: [{
      id: 'id',
      name: 'name'
    }]};
    service.getActiveUsers().subscribe();
    const requestAll = httpControler.expectOne(`${environment.apiUrl}/users`);
    const requestBlocked = httpControler.expectOne(`${environment.apiUrl}/users/blocked`);
    expect(requestAll.request.method).toEqual('GET');
    expect(requestBlocked.request.method).toEqual('GET');
    requestAll.flush(data);
    requestBlocked.flush({users: []});
    httpControler.verify();
  });
  it('#getActiveUsers should return only active users', ()=>{
      const data : UsersDTO = {
        users: [{
        id: 'id1',
        name: 'blocked'
      },{
        id: 'id2',
        name: 'active'
      }]};
      service.getActiveUsers().subscribe(result=>{
        expect(result.length).toEqual(1);
        expect(result[0].status).toEqual(UserStatus.Active)
        expect(result[0].id).toEqual('id2')
      });
      const requestAll = httpControler.expectOne(`${environment.apiUrl}/users`);
      const requestBlocked = httpControler.expectOne(`${environment.apiUrl}/users/blocked`);
      requestAll.flush(data);
      requestBlocked.flush({users: [data.users[0]]});
      httpControler.verify();
  });
  it('#getBlockedUsers should fetch with correct url', ()=>{
    service.getBlockedUsers().subscribe();
    httpControler.expectNone(`${environment.apiUrl}/users`);
    const requestBlocked = httpControler.expectOne(`${environment.apiUrl}/users/blocked`);
    expect(requestBlocked.request.method).toEqual('GET');
    requestBlocked.flush({users: []});
    httpControler.verify();
  });
  it('#getBlockedUsers should return only active users', ()=>{
      const data : UsersDTO = {
        users: [{
        id: 'id1',
        name: 'name'
      }]};
      service.getBlockedUsers().subscribe(result=>{
        expect(result.length).toEqual(data.users.length);
        expect(result[0].status).toEqual(UserStatus.Blocked)
        expect(result[0].id).toEqual('id1')
      });
      const requestBlocked = httpControler.expectOne(`${environment.apiUrl}/users/blocked`);
      requestBlocked.flush(data);
      httpControler.verify();
  });
  it('#blockUser should fetch with correct url and body', ()=>{
    const user = {
      id: 'id',
      username: 'name',
      status: UserStatus.Active
    }
    service.blockUser(user).subscribe();
    const request = httpControler.expectOne(`${environment.apiUrl}/users/blocked`);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body?.id).toEqual(user.id)
  });
  it('#unblockUser should fetch with correct url and body', ()=>{
    const user = {
      id: 'id',
      username: 'name',
      status: UserStatus.Active
    }
    service.unblockUser(user).subscribe();
    const request = httpControler.expectOne(`${environment.apiUrl}/users/blocked/${user.id}`);
    expect(request.request.method).toEqual('DELETE');
  });
});
