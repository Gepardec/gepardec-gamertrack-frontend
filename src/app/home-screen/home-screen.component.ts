import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatchHistoryListComponent} from './ui/match-history-list/match-history-list.component';
import {AuthService} from '../core/auth/auth.service';

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
  authService = inject(AuthService);

  isAuthorized() {
    console.log(this.authService.isAuthenticated());
    return this.authService.isAuthenticated();
  }
}
