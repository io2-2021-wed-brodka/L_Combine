import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {environment} from 'src/environments/environment';

import {MalfunctionService} from './malfunction.service';

describe('MalfunctionService', () => {
  const baseUrl = environment.apiUrl + '/malfunctions';

  let service: MalfunctionService;
  let httpControler: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MalfunctionService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getMalfunctions should fetch with correct url', () => {
    service.getMalfunctions().subscribe();

    const request1 = httpControler.expectOne(baseUrl);
    expect(request1.request.method).toEqual('GET');
    const request2 = httpControler.expectOne(environment.apiUrl + 'bikes');
    expect(request2.request.method).toEqual('GET');
  });

  it('#postMalfunction should fetch with correct url', () => {
    service.postMalfunction({id: 'id', description: 'd'}).subscribe();

    const request = httpControler.expectOne(baseUrl);
    expect(request.request.method).toEqual('POST');
  });

  it('#deleteMalfunction should fetch with correct url', () => {
    service.deleteMalfunction({
      id: 'id',
      description: '',
      reportingUserId: '',
      bikeId: ''
    }).subscribe();

    const request = httpControler.expectOne(baseUrl + '/id');
    expect(request.request.method).toEqual('DELETE');
  });
});
