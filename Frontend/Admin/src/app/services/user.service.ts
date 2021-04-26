import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment as env} from '../../environments/environment';
import { UsersDto } from '../dto/users-dto';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = `${env.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersDto>{
    return this.http.get<UsersDto>(this.baseUrl);
  }
}
