import { Character } from './../models/character';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/users';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Hints } from '../models/hints';
import { Score } from '../models/score';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ScoreService {

  public ROOT_URL = 'http://localhost:8080/WhoAmI/score/';

  constructor(private http: HttpClient) {
  }

  saveScore (scoreData: Score) {
    return firstValueFrom(this.http.post<any>(this.ROOT_URL + "new-score", scoreData));
  }

  updateScore (scoreData: Score) {
    return firstValueFrom(this.http.put<any>(this.ROOT_URL + "update-score", scoreData))
  }

  getAllScores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.ROOT_URL + "all-scores")
  }

  getAscScore(): Observable<Score[]> {
    return this.http.get<Score[]>(this.ROOT_URL + "asc")
  }

  
}

