import {Bike} from './bike';

export interface ReservedBike extends Bike {
  reservedAt?: Date;
  reservedTill?: Date;
}
