import { Observable, of } from "rxjs";
import { BikesDTO } from "src/app/dto/bikes-dto";
import { StationDTO } from "src/app/dto/station-dto";
import { StationsDTO } from "src/app/dto/stations-dto";
import { BikeState } from "src/app/models/bike";
import mockBikeService from "./mockBikeService";

export default {
    stations: [{id: 'id1', name: 'name1'},{id: 'id2', name: 'name2'}],
    getStation(stationId: string): Observable<StationDTO> {
        return of({id: stationId, name: 'name'})
    },
  
    getStations(): Observable<StationsDTO> {
        return of({ stations: this.stations})
    },
  
    getStationBikes(stationId: string): Observable<BikesDTO> {
        return of({  bikes: mockBikeService.bikes.map(bike=>({...bike, bikeStatus: BikeState.Available}))});
    }
}