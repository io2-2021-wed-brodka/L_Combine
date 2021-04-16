import { Observable, of } from "rxjs";
import { BikesDTO } from "src/app/dto/bikes-dto";
import { StationDTO } from "src/app/dto/station-dto";
import { StationsDTO } from "src/app/dto/stations-dto";
import { BikeState } from "src/app/models/bike";

export default {
    getStation(stationId: string): Observable<StationDTO> {
        return of({id: stationId, name: 'name'})
    },
  
    getStations(): Observable<StationsDTO> {
        return of({ stations: [{id: 'id1', name: 'name1'},{id: 'id2', name: 'name2'}]})
    },
  
    getStationBikes(stationId: string): Observable<BikesDTO> {
        return of({
            bikes: [{ 
            id: 'id1',
            bikeStatus: BikeState.Available,
            user: null,
            station: null
            },{ 
            id: 'id2',
            bikeStatus: BikeState.Available,
            user: null,
            station: null
        }]});
    }
}