import {Component, inject, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RankListService} from '../rank-list.service';
import {Score} from '../score.model';
import {ScoreComponent} from '../score/score.component';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-rank-list',
  imports: [
    NgForOf,
    FormsModule,
  ],
  templateUrl: './rank-list.component.html',
  styleUrl: './rank-list.component.css'
})
export class RankListComponent {
  scores: Score[] = [];
  games = [
    { id: 1, name: 'Game 1' , token: 'dzszfHohX3tbz9EL' },
    { id: 2, name: 'Game 2' , token: 'sYxkGW4fLNQEev3h' },
  ];
  scoreCounts = [1, 3, 5, 10, 15, 20];
  selectedGame = this.games[0];
  selectedScoreCount = this.scoreCounts[0];

  rankListService: RankListService = inject(RankListService);

  protected readonly ScoreComponent = ScoreComponent;



  filterScores() {
    this.rankListService.getTopScoresByGame(this.selectedGame.token, this.selectedScoreCount).subscribe(data => {
      console.log('Getting Scores:',data);
      this.scores = data;
    });
  }

  constructor() {
    this.rankListService.getTopScoresByGame(this.selectedGame.token, this.selectedScoreCount).subscribe(data => {
      console.log('Getting Scores:',data);
      this.scores = data;
    });
  }
}
