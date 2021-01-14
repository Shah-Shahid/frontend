import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from  './user';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = "http://127.0.0.1:8000";

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.API_URL}/api/users`);
  }

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.API_URL}/api/users`, user);
  }

  updateUser(user: User, id: number){
    return this.httpClient.put<User>(`${this.API_URL}/api/users/${id}`, user);
  }

  deleteUser(id: number){
    return this.httpClient.delete<User>(`${this.API_URL}/api/users/${id}`);
  }
}
