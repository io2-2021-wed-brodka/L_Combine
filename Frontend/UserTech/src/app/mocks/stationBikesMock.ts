import {Bike, BikeState} from '../models/bike';

export const STATION_BIKES: Bike[] = [
  {id: 0, state: BikeState.Available, stationId: 1},
  {id: 1, state: BikeState.Blocked, stationId: 1},
  {id: 2, state: BikeState.Reserved, stationId: 1},
  {id: 3, state: BikeState.Available, stationId: 1},
];
