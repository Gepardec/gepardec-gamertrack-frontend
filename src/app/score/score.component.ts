import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../user';
import {Score} from '../score.model';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  @Input() score!: Score
}
