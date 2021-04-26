import { TestBed } from '@angular/core/testing';

import { BikeService } from './bike.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { BikesDTO } from '../dto/bikes-dto';
import { environment } from 'src/environments/environment';
import { BikeState } from '../models/bike';

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

    it('#getAllBikes should return bikes from server', ()=>{
        const bikes: BikesDTO = {
            bikes: [{
                id: 'id',
                bikeStatus: BikeState.Available
            }]
        }
        service.getAllBikes().subscribe(result=>{
            expect(result).toEqual(bikes);
        })

        const request = httpTestingControler.expectOne(`${environment.apiUrl}/bikes`)
        request.flush(bikes);
        httpTestingControler.verify();
    });
});
