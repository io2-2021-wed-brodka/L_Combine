import {UserDto} from '../dto/user-dto'
import User from '../models/user'
export function UserFromDto(dto: UserDto): User{
    return {
        id: dto.id,
        username: dto.name
    }
}