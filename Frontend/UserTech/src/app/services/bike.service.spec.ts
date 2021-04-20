import { TestBed } from '@angular/core/testing';

import { BikeService } from './bike.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BikesDTO } from '../dto/bikes-dto';
import mockBikeService from '../testing/mock-services/mockBikeService';
import { environment } from 'src/environments/environment';

describe('BikeService', () => {
    let service: BikeService;
    let httpTestingControler: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule]
        });
        service = TestBed.inject(BikeService);
        httpTestingControler = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#getRentedBikes should return bikes from server', ()=>{
        const bikes: BikesDTO = {
            bikes: mockBikeService.bikes
        }
        service.getRentedBikes().subscribe(result=>{
            expect(result).toEqual(bikes);
        })

        const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes/rented`)
        request.flush(bikes);
        httpTestingControler.verify();
    });
});
