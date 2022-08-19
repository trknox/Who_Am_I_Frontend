import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  displayFormSubmitError: boolean = false; 

  auth: User = {
    username:"",
    password:""
  };

  placeholders = {
    username: "Enter Username",
    password: "Enter Password"
  }

  ngOnInit(): void {
  }

  processForm(loginForm: NgForm) {
    if(loginForm.form.status == 'VALID'){
      this.authService.login(this.auth).subscribe(
        (res) => {
        if(res != null) {
          // storing resp in console and userdata in local storage
          console.log(res),
          localStorage.setItem('token', res.token),
          localStorage.setItem('id', res.id),
          localStorage.setItem('role', res.role),
          localStorage.setItem('username', res.username)
          
          // redirect to login if user inactive
          if(!!localStorage.getItem('token') == false) {
            this.router.navigateByUrl('login')
          }
          if(res.role == "ADMIN") {
            this.router.navigateByUrl('admin')
          }
          else {
            this.router.navigateByUrl('home/'+res.username)
          }
        }
      });
    }
    else{
      this.displayFormSubmitError = true;
    }
  }

}
