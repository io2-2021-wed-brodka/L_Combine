import { BikeDTO } from '../dto/bike-dto';
import { StationDTO } from '../dto/station-dto';
import {UserDto} from '../dto/user-dto'
import { Bike } from '../models/bike';
import { BikeStation } from '../models/bikeStation';
import User, { UserStatus } from '../models/user'

export function UserFromDto(dto: UserDto, status: UserStatus): User{
    return {
        id: dto.id,
        username: dto.name,
        status: status
    }
}

export function bikeFromDTO(bike: BikeDTO): Bike {
    return {
      id: bike.id,
      state: bike.bikeStatus,
      station: bike.station ? stationFromDTO(bike.station) : undefined,
      user: bike.user? UserFromDto(bike.user, UserStatus.Active) : undefined
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