import {Component, inject, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {GameCardComponent} from '../game-card/game-card.component';
import {Game} from './game';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [GameCardComponent, NgForOf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  gameList: Game[] = [];
  gameService: GameService = inject(GameService)


  ngOnInit() {
    this.gameService.getAllGames().subscribe((games: Game[]) => {
      this.gameList = games
    });
  }
}
