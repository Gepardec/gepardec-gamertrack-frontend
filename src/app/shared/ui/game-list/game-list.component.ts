import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameCardComponent} from '../../../game/ui/game-card/game-card.component';
import {NgForOf} from '@angular/common';
import {Game} from '../../../core/models/game';

@Component({
  selector: 'app-game-list',
    imports: [
        GameCardComponent,
        NgForOf
    ],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  @Input() gameList: Game[] = [];
  @Input() selectedGame?: Game;
  @Output() onCardClick = new EventEmitter<Game>();


  onCardClicked(game: Game) {
    this.onCardClick.emit(game)
  }
}
