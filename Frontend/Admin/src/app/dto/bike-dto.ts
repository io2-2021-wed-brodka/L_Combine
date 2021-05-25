import {StationDTO} from './station-dto';
import {UserDTO} from './user-dto';
import {BikeState} from '../models/bike';

export interface BikeDTO {
  id: string;
  station?: StationDTO;
  user?: UserDTO;
  status: BikeState;
}
