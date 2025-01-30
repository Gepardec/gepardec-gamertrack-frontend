import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CreateMatch, Match} from './match';
import {config, Observable} from 'rxjs';
import {ConfigService} from './shared/config.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  http = inject(HttpClient)
  configService = inject(ConfigService)

  url = '/api/matches'


  createMatch(match: CreateMatch): Observable<Match> {
    console.log(match)
    return this.http.post<Match>(this.configService.getBackendUrlWithContext(`${this.url}`), match);
  }

  getAllMatchesFromGame(gameToken: string) {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      { params: new HttpParams().set("gameToken", gameToken) });
  }
}
