import {Component, inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Score} from '../score.model';
import {Match} from '../match';
import {MatchService} from '../match.service';

@Component({
  selector: 'app-match-history-list',
    imports: [
        NgForOf
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
