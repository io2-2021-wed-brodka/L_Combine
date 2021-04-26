import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment as env} from '../../environments/environment';
import { UsersDto } from '../dto/users-dto';
import User, { UserStatus } from '../models/user';
import { UserFromDto } from '../utils/dto-utils';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = `${env.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    //TODO: W trzecim sprincie przycisnąć ludzi od specki, żeby dało się to zrobić w bardziej cywilizowany sposób
    let allUsersObs = this.http.get<UsersDto>(this.baseUrl);
    let blockedUsersObs = this.http.get<UsersDto>(`${this.baseUrl}/blocked`);
    return forkJoin([allUsersObs, blockedUsersObs]).pipe(
      map(results=>{
        const allUsers = results[0];
        const blockUsers = results[1];
        return allUsers.users.map(user=>{
          const status = blockUsers.users.find(blocked=>user.id===blocked.id)? UserStatus.Blocked : UserStatus.Active;
          return UserFromDto(user, status);
        });
      })
    )
  }
}
