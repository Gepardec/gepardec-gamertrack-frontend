import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateMatch, Match} from './match';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  http = inject(HttpClient)

  url = 'api/matches'


  createMatch(match: CreateMatch): Observable<Match> {
    console.log(match)
    return this.http.post<Match>(`${this.url}`, match);
  }
}
