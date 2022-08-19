import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/service/auth.service';
import { UserService
 } from 'src/app/service/user.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private userService:UserService) {}

  signupForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [null, [Validators.required, Validators.minLength(3)], this.authService.validateUsernameNotTaken.bind(this.authService)],
    password: ['', Validators.required]
  })

  get firstName() {
    return this.signupForm.get('firstName')
  }
  get lastName() {
    return this.signupForm.get('lastName')
  }
  get username() {
    return this.signupForm.get('username')
  }
  get password() {
    return this.signupForm.get('password')
  }

  displayFormSubmitError: boolean = false;

  user: User = {
    id:"",
    firstName:"",
    lastName:"",
    username: "",
    password:"",
  };

  placeholders = {
    firstName: "Enter First Name",
    lastName: "Enter Last Name",
    username: "Enter Username",
    password: "Enter Password"
  };

  ngOnInit(): void {}

  onSubmit(){
    console.log("USERRRRR" + this.signupForm.value)
    if(this.signupForm.status == 'VALID'){
      this.authService.signUp(this.signupForm.value).catch(e => {
        console.log(e);
    });
      this.router.navigateByUrl('/login');
    }
    else{
      this.displayFormSubmitError = true;
    }
  }
}
