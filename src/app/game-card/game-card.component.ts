import {Component, inject, Input} from '@angular/core';
import {Game} from '../game/game';
import {Router} from '@angular/router';
import {routes} from '../app.routes';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() game!: Game;

  router = inject(Router)


  openGame(token: String) {
    this.router.navigate([`/games/${token}`]);
  }
}
