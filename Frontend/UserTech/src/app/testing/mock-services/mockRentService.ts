import { Observable, of } from "rxjs";
import { BikeDTO } from "src/app/dto/bike-dto";
import { Bike, BikeState } from "src/app/models/bike";

export default {
    rentBike(bike: Bike): Observable<BikeDTO>{
        return of({id: bike.id, user: null, station: null, bikeStatus: BikeState.Rented});
    },
    
    returnBike(bikeId: string, stationId: string): Observable<BikeDTO> {
        return of({id: bikeId, user: null, station: {id: stationId, name: 'name'}, bikeStatus: BikeState.Available})
    }
}