import {Observable, of} from 'rxjs';
import {BikesDTO} from 'src/app/dto/bikes-dto';
import {BikeState} from 'src/app/models/bike';

export default {
    bikes: [{
        id: 'id1',
        bikeStatus: BikeState.Rented
        }, {
        id: 'id2',
        bikeStatus: BikeState.Rented
    }],
    getRentedBikes(): Observable<BikesDTO>{
        return of({ bikes: this.bikes});
    }
};
