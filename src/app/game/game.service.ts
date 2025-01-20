import {inject, Injectable} from '@angular/core';
import {CreateGame, Game} from './game';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

class UpdateGame {
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  url = '/api/games';

  games: Game[] = [];

  private http = inject(HttpClient)


  getAllGames(): Observable<Game[]>{
    return this.http.get<Game[]>(this.url);
  }

  getGameByToken(token: String): Observable<Game>{
    return this.http.get<Game>(`${this.url}/${token}`);
  }

  createGame(name: String, rules: String): Observable<Game> {
    let game: CreateGame = {
      name: name,
      rules: rules
    }
    return this.http.post<Game>(this.url, game);
  }

  deleteGame(token: String): Observable<Response> {
    return this.http.delete<Response>(`${this.url}/${token}`);
  }

  updateGame(updateGame: UpdateGame, token:String) {
    return this.http.put<Game>(`${this.url}/${token}`, updateGame)
  }
}
