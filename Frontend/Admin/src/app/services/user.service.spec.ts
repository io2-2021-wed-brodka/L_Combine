import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { UserDto } from '../dto/user-dto';
import { UsersDto } from '../dto/users-dto';

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
      expect(result).toEqual(data)
    );
    const response = httpControler.expectOne(`${environment.apiUrl}/users`);
    response.flush(data);
    httpControler.verify();
  });
});
