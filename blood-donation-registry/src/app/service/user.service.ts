import { Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO, UserDTO } from '../models/dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<UserDTO[]>('api/user');
  }

  getOne(id: number) {
    return this.http.get<UserDTO>('api/user/' + id);
  }

  create(user: UserDTO) {
    return this.http.post<UserDTO>('api/user', user);
  }

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('/api/user/login', data);
  }
}
