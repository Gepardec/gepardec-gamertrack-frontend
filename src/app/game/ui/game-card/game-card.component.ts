import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Game} from '../../../shared/models/game';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-game-card',
  imports: [
    NgIf
  ],
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
