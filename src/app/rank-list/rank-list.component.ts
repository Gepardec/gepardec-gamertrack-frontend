import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {RankListService} from './rank-list.service';
import {Score} from '../core/models/score';
import {ScoreComponent} from './ui/score/score.component';
import {FormsModule} from '@angular/forms';
import {Game} from "../core/models/game";
import {GameService} from "../game/game.service";


@Component({
  selector: 'app-rank-list',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './rank-list.component.html',
  styleUrl: './rank-list.component.css'
})
export class RankListComponent implements OnInit{
  scores: Score[] = [];
  games: Game[] = [];
  scoreCounts = [5, 10, 15, 20];
  selectedGame!: Game | undefined;
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
    });
  }

  filterScores() {
    this.rankListService.getTopScoresByGame(this.selectedGame!.token, this.selectedScoreCount).subscribe( {
      next: scores => {

        this.scores = scores;
      },
    });
  }
}
