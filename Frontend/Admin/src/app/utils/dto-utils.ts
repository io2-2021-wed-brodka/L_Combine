import {UserDTO} from '../dto/user-dto';
import User, {UserStatus} from '../models/user';
import {StationDTO} from '../dto/station-dto';
import {BikeStation} from '../models/bikeStation';
import {BikeDTO} from '../dto/bike-dto';
import {Bike} from '../models/bike';
import Tech from '../models/tech';
import {TechDTO} from '../dto/tech-dto';

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
    bikeCount: station.activeBikesCount,
    bikesLimit: station.bikesLimit
  };
}

export function bikeFromDTO(bike: BikeDTO): Bike {
  return {
    id: bike.id,
    state: bike.status,
    station: bike.station ? stationFromDTO(bike.station) : undefined,
    user: bike.user ? userFromDTO(bike.user, UserStatus.Active) : undefined
  };
}

export function techFromDTO(tech: TechDTO): Tech{
  return {
    username: tech.name,
    id: tech.id
  }
}
