import {Component, inject, Input, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RankListService} from '../rank-list.service';
import {Score} from '../score.model';
import {ScoreComponent} from '../score/score.component';
import {FormsModule} from '@angular/forms';
import {Game} from "../game/game";
import {GameService} from "../game/game.service";
import {first} from "rxjs";


@Component({
  selector: 'app-rank-list',
  imports: [
    NgForOf,
    FormsModule,
  ],
  templateUrl: './rank-list.component.html',
  styleUrl: './rank-list.component.css'
})
export class RankListComponent implements OnInit{
  scores: Score[] = [];
  games: Game[] = [];
  scoreCounts = [5, 10, 15, 20];
  selectedGame!: Game;
  selectedScoreCount: number = this.scoreCounts[1];

  gameService = inject(GameService);
  rankListService = inject(RankListService);

  protected readonly ScoreComponent = ScoreComponent;


  async ngOnInit() {
    this.gameService.getAllGames().subscribe({
      next: games => {
        if (games.length > 0) {
          this.games = games;
          this.selectedGame = games[0]
          this.filterScores()
        }
      },
      error: err => {
        console.log("Could not fetch games: " + err);
      }
    });
  }

  filterScores() {
    this.rankListService.getTopScoresByGame(this.selectedGame.token, this.selectedScoreCount).subscribe( {
      next: scores => {
        console.log('Getting Scores', scores)
        this.scores = scores;
      },
      error: err => {
        console.log('Could not fetch scores: ', err);
      }
    });
  }
}
