import {Observable, of} from 'rxjs';
import {BikesDTO} from 'src/app/dto/bikes-dto';
import {BikeState} from 'src/app/models/bike';

export default {
    bikes: [{
        id: 'id1',
        status: BikeState.Rented
        }, {
        id: 'id2',
        status: BikeState.Rented
    }],
    getRentedBikes(): Observable<BikesDTO>{
        return of({ bikes: this.bikes});
    }
};
