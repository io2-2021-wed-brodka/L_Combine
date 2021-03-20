import {BikeStation, StationState} from '../models/bikeStation';
import {STATION_BIKES} from './stationBikesMock';

export const STATIONS: BikeStation[] = [
  {
    id: 1,
    locationName: 'Stacja startowa',
    stationState: StationState.Active,
    bikes: STATION_BIKES
  },
  {
    id: 2,
    locationName: 'Stacja końcowa',
    stationState: StationState.Active,
    bikes: STATION_BIKES
  },
  {
    id: 3,
    locationName: 'Stacja zablokowana',
    stationState: StationState.Blocked,
    bikes: STATION_BIKES
  }
];
