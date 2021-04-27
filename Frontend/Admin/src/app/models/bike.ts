import {BikeStation} from './bikeStation';
import User from './user';

export interface Bike {
  id: string;
  state: BikeState;
  station?: BikeStation;
  user?: User;
}

export enum BikeState {
  Available = 'available',
  Rented = 'rented',
  Reserved = 'reserved',
  Blocked = 'blocked',
}
