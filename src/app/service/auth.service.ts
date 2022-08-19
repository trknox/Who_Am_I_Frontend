import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { User } from '../models/users';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://localhost:8080/WhoAmI/";

  constructor(private http: HttpClient, private route: Router, private userService: UserService) { }



  login(auth: User) {
    return this.http.post<any>(this.URL + "auth", auth)
  }
  signUp(userData:Object){
    return firstValueFrom(this.http.post<any>(this.URL + "auth/newuser", userData));
  }
  getAuthToken() {
    return localStorage.getItem("token"); 
  }
  isLoggedIn() {
    // !! means double negattion, return boolean
    return !!localStorage.getItem("token")
  }
  logoutUser() {
    // navigates user back to login and removes local storage
    this.route.navigate(['login'])
    window.localStorage.clear();
  }

  validateUsernameNotTaken(control: AbstractControl) {

    return this.checkUsernameNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { usernameTaken: true};
      })
    );
  }
  checkUsernameNotTaken(username: string):Observable<boolean> {

    return this.userService.getAllUsers().pipe(
      map((usernameList: Array<any>) => 
      usernameList.filter(user => user.username === username)),
    map(users => !users.length)
    );
  }
}

