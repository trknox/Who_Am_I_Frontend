import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/users';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Hints } from '../models/hints';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HintService {

  public ROOT_URL = 'https://who-am-i.azurewebsites.net/WhoAmI/hints/char-id/';

  constructor(private http: HttpClient) {
  }

  getHintByCharId (charId: string): Observable<Hints> {
    return this.http.get<Hints>(this.ROOT_URL + charId);
  }

  
}

