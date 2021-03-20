import {BikeStation, StationState} from '../models/bikeStation';
import {STATION_BIKES} from './stationBikesMock';

export const STATION: BikeStation = {
  id: 1,
  locationName: 'Stacja startowa',
  stationState: StationState.Active,
  bikes: STATION_BIKES
};
