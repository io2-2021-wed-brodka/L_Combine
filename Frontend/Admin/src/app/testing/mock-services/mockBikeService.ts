import {Observable, of} from 'rxjs';
import {BikesDTO} from 'src/app/dto/bikes-dto';
import {BikeState} from 'src/app/models/bike';
import {StationState} from '../../models/bikeStation';

export default {
  bikes: [{
    id: 'id1',
    status: BikeState.Available,
    station: {
      id: 'id',
      status: StationState.Active,
      name: 'a',
      activeBikesCount: 1,
      bikesLimit: 10
    },
    
  }, {
    id: 'id2',
    status: BikeState.Rented,
    station: {
      id: 'id',
      status: StationState.Active,
      name: 'a',
      activeBikesCount: 1,
      bikesLimit: 10
    }
  }],

  getRentedBikes(): Observable<BikesDTO> {
    return of({bikes: this.bikes});
  }
}
