import {inject, Injectable} from '@angular/core';
import {CreateGame, Game} from './game';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  url = '/api/games';

  games: Game[] = [];

  private http = inject(HttpClient)


  getAllGames(){
    return this.http.get<Game[]>(this.url);
  }

  async getGameByToken(token: String): Promise<Game | undefined> {
    const data = await fetch(`${this.url}/${token}`);
    return (await data.json()) ?? {};
  }

  createGame(name: String, rules: String): Observable<Game> {
    let game: CreateGame = {
      name: name,
      rules: rules
    }
    return this.http.post(this.url, game).pipe(map((response: any) => response.symbol))
  }
}
