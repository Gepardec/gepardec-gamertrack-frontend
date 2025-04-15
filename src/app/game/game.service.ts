import {inject, Injectable} from '@angular/core';
import {CreateGame, Game} from '../core/models/game';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from "../core/config/config.service";

class UpdateGame {
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  url = '/api/games';

  games: Game[] = [];

  private http = inject(HttpClient)
  private configService = inject(ConfigService)


  getAllGames(): Observable<Game[]>{
    return this.http.get<Game[]>(this.configService.getBackendUrlWithContext(this.url));
  }

  getGameByToken(token: string): Observable<Game>{
    return this.http.get<Game>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`));
  }

  createGame(name: string, rules: string): Observable<Game> {
    let game: CreateGame = {
      name: name,
      rules: rules
    }
    return this.http.post<Game>(this.configService.getBackendUrlWithContext(this.url), game);
  }

  deleteGame(token: string): Observable<Response> {
    return this.http.delete<Response>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`));
  }

  updateGame(updateGame: UpdateGame, token:string) {
    return this.http.put<Game>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`), updateGame)
  }
}
