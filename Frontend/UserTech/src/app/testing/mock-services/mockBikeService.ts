import { Observable, of } from "rxjs";
import { BikesDTO } from "src/app/dto/bikes-dto";
import { BikeState } from "src/app/models/bike";

export default {
    bikes: [{ 
        id: 'id1',
        bikeStatus: BikeState.Rented,
        user: null,
        station: null
        },{ 
        id: 'id2',
        bikeStatus: BikeState.Rented,
        user: null,
        station: null
    }],
    getRentedBikes(): Observable<BikesDTO>{
        return of({ bikes: this.bikes});
    }
}