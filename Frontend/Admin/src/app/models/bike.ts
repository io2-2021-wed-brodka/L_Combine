import {BikeStation} from './bikeStation';

export interface Bike {
  id: string;
  state: BikeState;
  station?: BikeStation;
}

export enum BikeState {
  Available = 'available',
  Rented = 'rented',
  Reserved = 'reserved',
  Blocked = 'blocked',
}
