import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {CreateMatch, Match} from '../shared/models/match';
import {config, map, Observable} from 'rxjs';
import {ConfigService} from '../shared/service/config.service';

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

  getAllMatchesFromGame(gameToken: string): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      { params: new HttpParams().set("gameToken", gameToken) });
  }

  getXAmountOfLastMatches(gameToken: string, amount: number): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      { params: new HttpParams().set("gameToken", gameToken).set("pageSize", amount).set("pageNumber", "1") });
  }

  getXAmountOfLastMatchesForUser(gameToken: string, amount: number, userToken: string): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      { params: new HttpParams().set("gameToken", gameToken).set("pageSize", amount).set("pageNumber", "1").set("userToken", userToken) });
  }

  getMatchCount(gameToken: string): Observable<number> {
    return this.http.head(
      this.configService.getBackendUrlWithContext(this.url),
      {observe: 'response', params: new HttpParams().set("gameToken", gameToken)})
        .pipe(
          map((event: any) => {
            if (event instanceof HttpResponse) {
              return Number(event.headers.get('X-Total-Count'));
            }
            return 0;
          }),
        );
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      { params: new HttpParams()});
  }
}
