import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Game} from '../game/game';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() game!: Game;
  @Input() isSelected?: Boolean;
  @Output() onCardClick = new EventEmitter<any>();


  protected readonly EventEmitter = EventEmitter;

  onClick() {
    this.onCardClick.emit("")
  }
}
