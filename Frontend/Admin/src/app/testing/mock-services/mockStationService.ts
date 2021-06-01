import {Observable, of} from 'rxjs';
import {BikesDTO} from 'src/app/dto/bikes-dto';
import {StationsDTO} from 'src/app/dto/stations-dto';
import {BikeState} from 'src/app/models/bike';
import {StationState} from 'src/app/models/bikeStation';
import { BikeStationExtended } from 'src/app/models/bikeServiceExtended';
import mockBikeService from './mockBikeService';

export default {
    stations: [{id: 'id1', locationName: 'name1', stationState: StationState.Active,  bikeCount: 1, bikesLimit: 10, malfunctionCount: 0, reservationCount: 0},
        {id: 'id2', locationName: 'name2', stationState: StationState.Active, bikeCount: 1, bikesLimit: 10, malfunctionCount: 1, reservationCount: 0}] as BikeStationExtended[],
    getStations(): Observable<BikeStationExtended[]> {
        return of(this.stations);
    },

    getStationBikes(stationId: string): Observable<BikesDTO> {
        return of({  bikes: mockBikeService.bikes.map(bike => ({...bike, status: BikeState.Available}))});
    }
};
