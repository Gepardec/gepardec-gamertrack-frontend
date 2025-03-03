import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatchHistoryListComponent} from './ui/match-history-list/match-history-list.component';
import {AuthService} from '../core/auth/auth.service';

@Component({
  selector: 'app-home-screen',
  imports: [
    MatchHistoryListComponent
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {
  authService = inject(AuthService);
}
