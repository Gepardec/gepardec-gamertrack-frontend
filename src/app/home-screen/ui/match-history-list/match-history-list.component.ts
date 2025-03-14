import {Component, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Match} from '../../../core/models/match';
import {MatchService} from '../../../match/match.service';
import {RouterLink} from "@angular/router";
import {AuthService} from '../../../core/auth/auth.service';
import {DateFormatterService} from '../../../shared/utility/date-formatter.service';

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
  authService = inject(AuthService);
  dateFormatterService = inject(DateFormatterService);

  async ngOnInit() {
    this.matchService.getAllMatches().subscribe( {
      next: matches => {

        this.matches = matches;
      },
    });
  }


  isAuthorized() {
    return this.authService.isAuthenticated();
  }
}
