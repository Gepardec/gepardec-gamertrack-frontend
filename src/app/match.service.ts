import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
