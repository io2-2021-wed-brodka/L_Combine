import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment as env} from '../../environments/environment';
import {UserDTO} from '../dto/user-dto';
import {UsersDTO} from '../dto/users-dto';
import User, {UserStatus} from '../models/user';
import {userFromDTO} from '../utils/dto-utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = `${env.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getActiveUsers(): Observable<User[]>{
    //TODO: W trzecim sprincie przycisnąć ludzi od specki, żeby dało się to zrobić w bardziej cywilizowany sposób
    let allUsersObs = this.http.get<UsersDTO>(this.baseUrl);
    let blockedUsersObs = this.http.get<UsersDTO>(`${this.baseUrl}/blocked`);
    return forkJoin([allUsersObs, blockedUsersObs]).pipe(
      map(results=>{
        const allUsers = results[0];
        const blockUsers = results[1];
        return allUsers.users.map(user=>{
          const status = blockUsers.users.find(blocked=>user.id===blocked.id)? UserStatus.Blocked : UserStatus.Active;
          return userFromDTO(user, status);
        }).filter(user=>user.status===UserStatus.Active);
      })
    )
  }
  getBlockedUsers(): Observable<User[]>{
    return this.http.get<UsersDTO>(`${this.baseUrl}/blocked`).pipe(
      map(result=>result.users.map(dto=> userFromDTO(dto, UserStatus.Blocked)))
    );
  }
  blockUser(user: User): Observable<UserDTO>{
    return this.http.post<UserDTO>(`${this.baseUrl}/blocked`, {id: user.id});
  }
  unblockUser(user: User): Observable<any>{
    return this.http.delete(`${this.baseUrl}/blocked/${user.id}`);
  }
}
