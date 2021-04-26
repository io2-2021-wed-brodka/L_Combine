import {StationDTO} from './station-dto';
import {UserDto} from './user-dto';
import {BikeState} from '../models/bike';

export interface BikeDTO {
  id: string;
  station?: StationDTO;
  user?: UserDto;
  bikeStatus: BikeState;
}
