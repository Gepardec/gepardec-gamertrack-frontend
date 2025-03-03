import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Score} from '../../../shared/models/score.model';
import {Match} from '../../../shared/models/match';
import {MatchService} from '../../../match/match.service';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-match-history-list',
    imports: [
        NgForOf,
        NgIf,
        RouterLink
    ],
  templateUrl: './match-history-list.component.html',
  styleUrl: './match-history-list.component.css'
})
export class MatchHistoryListComponent {
  matches: Match[] = [];

  matchService = inject(MatchService);

  async ngOnInit() {
    this.matchService.getAllMatches().subscribe( {
      next: matches => {
        console.log('Getting Matches', matches)
        this.matches = matches;
      },
      error: err => {
        console.log('Could not fetch Matches: ', err);
      }
    });
  }
}
