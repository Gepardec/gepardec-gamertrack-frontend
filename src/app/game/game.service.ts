import {inject, Injectable} from '@angular/core';
import {CreateGame, Game} from './game';
import {HttpClient} from '@angular/common/http';
import {config, map, Observable, tap} from 'rxjs';
import {ConfigService} from "../shared/config.service";

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

  getGameByToken(token: String): Observable<Game>{
    return this.http.get<Game>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`));
  }

  createGame(name: String, rules: String): Observable<Game> {
    let game: CreateGame = {
      name: name,
      rules: rules
    }
    return this.http.post<Game>(this.configService.getBackendUrlWithContext(this.url), game);
  }

  deleteGame(token: String): Observable<Response> {
    return this.http.delete<Response>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`));
  }

  updateGame(updateGame: UpdateGame, token:String) {
    return this.http.put<Game>(this.configService.getBackendUrlWithContext(`${this.url}/${token}`), updateGame)
  }
}
