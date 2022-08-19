import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public login: boolean = false
  constructor(private currRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.login = true
  }
}
