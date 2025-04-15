import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {UserListComponent} from './user/ui/user-list/user-list.component';
import {RouterModule} from '@angular/router';
import {HomeHeaderComponent} from './core/ui/home-header/home-header.component';
import {NotificationComponent} from './core/ui/notification/notification.component';
import {NgIf} from '@angular/common';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HomeHeaderComponent, NotificationComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gepardec-gamertrack-frontend';

  authService = inject(AuthService);

  constructor(private router: Router) {}

  isNewMatchRoute(): boolean {
    return this.router.url.includes('/new');
  }
  isAuthorized() {
    return this.authService.isAuthenticated();
  }
}
