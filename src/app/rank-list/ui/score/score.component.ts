import {Component, Input} from '@angular/core';
import {Score} from '../../../core/models/score';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  @Input() score!: Score
}
