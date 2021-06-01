import {Injectable} from '@angular/core';
import {forkJoin, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import {StationsDTO} from '../dto/stations-dto';
import {BikesDTO} from '../dto/bikes-dto';
import {NewStationDTO} from '../dto/new-station-dto';
import {StationDTO} from '../dto/station-dto';
import {map} from 'rxjs/operators';
import { BikeStationExtended } from '../models/bikeServiceExtended';
import { BikeService } from './bike.service';
import { MalfunctionsDTO } from '../dto/malfunctions-dto';
import { MalfunctionDTO } from '../dto/malfunction-dto';
import { BikeDTO } from '../dto/bike-dto';
import { stationFromDTO } from '../utils/dto-utils';
import { BikeState } from '../models/bike';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private baseUrl = `${env.apiUrl}/stations`;

  constructor(
    private http: HttpClient,
    private bikeService: BikeService,
    ) {
  }

  getStations(): Observable<BikeStationExtended[]> {
    const stationsRequest = this.http.get<StationsDTO>(this.baseUrl);
    const bikesRequest = this.bikeService.getAllBikes();
    const malfunctionsRequest = this.http.get<MalfunctionsDTO>(`${env.apiUrl}/malfunctions`)
    
    return forkJoin([stationsRequest, bikesRequest, malfunctionsRequest]).pipe(
      map(([stations, bikes, malfunctions])=>{
        const malfunctionsBikes = malfunctions.malfunctions
          .reduce((acc, malfunction)=>{
            acc[malfunction.bikeId] = acc[malfunction.bikeId] + 1 || 1;
            return acc;
          }, {} as  any); 

        const malfunctionsStation = Object.entries(malfunctionsBikes)
          .reduce((acc, [bikeId, malfunctionInBike])=>{
            const bikeStationId = bikes.bikes.find(bike=>bike.id===bikeId)?.station?.id;
            if(bikeStationId)
              acc[bikeStationId] = acc[bikeStationId] + malfunctionInBike || malfunctionInBike;
            return acc;
          },{} as any);

        const reseredBikeStations = bikes.bikes
          .reduce((acc, bike) =>{
            if(bike.station && bike.status === BikeState.Reserved)
              acc[bike.station.id] = acc[bike.station.id] + 1 || 1 
            return acc
          }, {} as  any);

        return stations.stations.map(station=>({
          ...stationFromDTO(station),
          malfunctionCount: malfunctionsStation[station.id] || 0,
          reservationCount: reseredBikeStations[station.id] || 0
        }));
      })
    );
  }

  getStationBikes(stationId: string): Observable<BikesDTO> {
    return this.http.get<BikesDTO>(`${env.apiUrl}/bikes`).pipe(
      map(bikes => {
        return {bikes: bikes.bikes.filter(bike => bike.station?.id === stationId)};
      })
    );
  }

  addStation(newStation: NewStationDTO): Observable<StationDTO> {
    return this.http.post<StationDTO>(this.baseUrl, newStation);
  }

  deleteStation(stationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${stationId}`);
  }

  blockStation(stationId: string): Observable<StationDTO> {
    return this.http.post<StationDTO>(`${this.baseUrl}/blocked`, {id: stationId});
  }

  unblockStation(stationId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/blocked/${stationId}`);
  }
}
