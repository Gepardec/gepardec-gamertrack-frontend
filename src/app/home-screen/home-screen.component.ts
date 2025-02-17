import { Component } from '@angular/core';
import {RankListComponent} from '../rank-list/rank-list.component';
import {RouterLink} from '@angular/router';
import {MatchHistoryListComponent} from '../match-history-list/match-history-list.component';

@Component({
  selector: 'app-home-screen',
  imports: [
    RouterLink,
    MatchHistoryListComponent
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

}
