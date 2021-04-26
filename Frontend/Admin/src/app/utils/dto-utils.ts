import {UserDto} from '../dto/user-dto'
import User, { UserStatus } from '../models/user'
export function UserFromDto(dto: UserDto, status: UserStatus): User{
    return {
        id: dto.id,
        username: dto.name,
        status: status
    }
}