import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/users';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public ROOT_URL = 'http://localhost:8080/WhoAmI/user/';

  constructor(private http: HttpClient) {
  }

  getUserById (id: string): Observable<User> {
    return this.http.get<User>(this.ROOT_URL +`user-id/${id}`);
  }

  getUserByUsername (username: string): Observable<User> {
    return this.http.get<User>(this.ROOT_URL +`user-username/${username}`);
  }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.ROOT_URL+"all-users");
  }

  UpdateUser(updatedUser: User): Observable<User> {
    return this.http.put<User>(this.ROOT_URL+'edit', updatedUser);
  }
}

