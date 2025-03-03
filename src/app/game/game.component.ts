import {Component, inject, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {Game} from '../core/models/game';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {GameListComponent} from '../shared/ui/game-list/game-list.component';
import {AuthService} from '../core/auth/auth.service';

@Component({
  selector: 'app-game',
    imports: [GameListComponent, NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  gameList: Game[] = [];
  gameService: GameService = inject(GameService)
  router = inject(Router)
  private authService = inject(AuthService);


  ngOnInit() {
    this.gameService.getAllGames().subscribe((games: Game[]) => {
      this.gameList = games
    });
  }

  createGame() {
    this.router.navigate(["/games/new"]);
  }

  openGame(token: String) {
    this.router.navigate([`/games/${token}`]);
  }

  isAuthorized() {
    return this.authService.isAuthenticated()
  }

}
