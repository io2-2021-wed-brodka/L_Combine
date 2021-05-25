import {BikeDTO} from '../dto/bike-dto';
import {Bike, BikeState} from '../models/bike';
import {StationDTO} from '../dto/station-dto';
import {BikeStation} from '../models/bikeStation';
import {ReservedBikeDTO} from '../dto/reserved-bike-dto';
import {ReservedBike} from '../models/reserved-bike';
import {UserDTO} from '../dto/user-dto';
import User from '../models/user';

export function bikeFromDTO(bike: BikeDTO): Bike {
  console.log(bike);
  return {
    id: bike.id,
    state: bike.status,
    station: bike.station ? stationFromDTO(bike.station) : undefined,
    user: bike.user ? userFromDTO(bike.user) : undefined
  };
}

export function stationFromDTO(station: StationDTO): BikeStation {
  return {
    id: station.id,
    locationName: station.name,
    stationState: station.status,
    bikeCount: station.activeBikesCount
  };
}

export function reservedBikeFromDTO(bike: ReservedBikeDTO): ReservedBike {
  console.log(bike.reservedAt, new Date(bike.reservedAt || ''));
  return {
    id: bike.id,
    station: bike.station ? stationFromDTO(bike.station) : undefined,
    state: BikeState.Reserved,
    reservedAt: new Date(bike.reservedAt || ''),
    reservedTill: new Date(bike.reservedTill || ''),
  };
}

export function userFromDTO(user: UserDTO): User {
  return {
    username: user.name,
    id: user.id
  };
}
