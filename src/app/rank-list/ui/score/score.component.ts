import {Component, inject, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../../../user/user.service';
import {User} from '../../../shared/models/user';
import {Score} from '../../../shared/models/score.model';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  @Input() score!: Score
}
