import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaderResponse, HttpParams} from '@angular/common/http';
import {CreateMatch, Match} from '../core/models/match';
import {firstValueFrom, map, Observable} from 'rxjs';
import {ConfigService} from '../core/config/config.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  http = inject(HttpClient)
  configService = inject(ConfigService)

  url = '/api/matches'


  createMatch(match: CreateMatch): Observable<Match> {

    return this.http.post<Match>(this.configService.getBackendUrlWithContext(`${this.url}`), match);
  }

  getAllMatchesFromGame(gameToken: string): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      {params: new HttpParams().set("gameToken", gameToken)});
  }

  getXAmountOfLastMatches(gameToken: string, amount: number): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      {params: new HttpParams().set("gameToken", gameToken).set("pageSize", amount).set("pageNumber", "1")});
  }

  getXAmountOfLastMatchesForUser(gameToken: string, amount: number, userToken: string): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      {params: new HttpParams().set("gameToken", gameToken).set("pageSize", amount).set("pageNumber", "1").set("userToken", userToken)});
  }

  async getMatchCount(gameToken: string) {
    return await firstValueFrom(this.http.head<HttpHeaderResponse>(
      this.configService.getBackendUrlWithContext(this.url), {
        observe: 'response',
        params: new HttpParams().set("gameToken", gameToken)
      })
      .pipe(
        map((response) => {
            return Number(response.headers.get('x-total-count'));
          }
        ),
      ));
  }

  getAllMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      {params: new HttpParams()});
  }
  getLastMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(
      this.configService.getBackendUrlWithContext(this.url),
      {params: new HttpParams().set("pageNumber", 1).set("pageSize", 10)});
  }
}
