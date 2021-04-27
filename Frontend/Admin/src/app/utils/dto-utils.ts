import {UserDTO} from '../dto/user-dto';
import User, {UserStatus} from '../models/user';
import {StationDTO} from '../dto/station-dto';
import {BikeStation} from '../models/bikeStation';
import {BikeDTO} from '../dto/bike-dto';
import {Bike} from '../models/bike';

export function userFromDTO(dto: UserDTO, status: UserStatus): User {
  return {
    id: dto.id,
    username: dto.name,
    status
  };
}

export function stationFromDTO(station: StationDTO): BikeStation {
  return {
    id: station.id,
    locationName: station.name,
    stationState: station.status,
    bikeCount: station.activeBikeCount
  };
}

export function bikeFromDTO(bike: BikeDTO): Bike {
  return {
    id: bike.id,
    state: bike.bikeStatus,
    station: bike.station ? stationFromDTO(bike.station) : undefined,
    user: bike.user ? userFromDTO(bike.user, UserStatus.Active) : undefined
  };
}
