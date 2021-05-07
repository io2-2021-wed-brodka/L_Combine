import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { TechService } from './tech.service';

describe('TechService', () => {
  let service: TechService;
  let httpControler: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TechService);
    httpControler = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTechs should fetch to correct url', ()=>{
    service.getTechs().subscribe();
    const request = httpControler.expectOne(`${environment.apiUrl}/techs`);
    expect(request.request.method).toEqual('GET')
  });
});
