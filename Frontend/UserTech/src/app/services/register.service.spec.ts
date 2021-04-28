import {TestBed} from '@angular/core/testing';

import {RegisterService} from './register.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticateRequestDTO} from '../dto/authenticate-request-dto';
import {environment as env} from '../../environments/environment';
import {IGNORE_ERROR_INTERCEPT} from '../constants/headers';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(RegisterService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#register should call #post on endpoint', () => {
    const data: AuthenticateRequestDTO = {
      login: 'a',
      password: 'b'
    };

    service.register(data).subscribe();

    const request = httpController.expectOne(`${env.apiUrl}/register`);
    expect(request.request.method).toEqual('POST');
  });

  it('#register should send provided data', () => {
    const data: AuthenticateRequestDTO = {
      login: 'a',
      password: 'b'
    };

    service.register(data).subscribe();

    const request = httpController.match(_ => true)[0];
    expect(request.request.body).toEqual(data);
  });

  it('#register should set IGNORE_ERROR_INTERCEPT header', () => {
    const data: AuthenticateRequestDTO = {
      login: 'a',
      password: 'b'
    };

    service.register(data).subscribe();

    const request = httpController.match(_ => true)[0];
    expect(request.request.headers.has(IGNORE_ERROR_INTERCEPT)).toBeTrue();
  });
});
