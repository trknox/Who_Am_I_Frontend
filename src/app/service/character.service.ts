import { Character } from './../models/character';
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
export class CharacterService {

  public ROOT_URL = 'https://who-am-i.azurewebsites.net/WhoAmI/character/';

  constructor(private http: HttpClient) {
  }

  getCharById (id: string): Observable<Character> {
    return this.http.get<Character>(this.ROOT_URL + 'id/' + id);
  }

  getAllCharacters (): Observable<Character[]> {
    return this.http.get<Character[]>(this.ROOT_URL + 'all-characters')
  }

  
}

