import {Component, inject, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {GameCardComponent} from '../game-card/game-card.component';
import {Game} from './game';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [GameCardComponent, NgForOf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  gameList: Game[] = [];
  gameService: GameService = inject(GameService)
  router = inject(Router)


  ngOnInit() {
    this.gameService.getAllGames().subscribe((games: Game[]) => {
      this.gameList = games
    });
  }

  createGame() {
    this.router.navigate(["/games/new"]);
  }
}
