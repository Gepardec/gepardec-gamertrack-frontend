import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {UserListComponent} from './user/ui/user-list/user-list.component';
import {RouterModule} from '@angular/router';
import {HomeHeaderComponent} from './core/ui/home-header/home-header.component';
import {NotificationComponent} from './core/ui/notification/notification.component';
import {NgIf} from '@angular/common';
import { HealthService } from './core/health/health.service';
import {AuthService} from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HomeHeaderComponent, NotificationComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gepardec-gamertrack-frontend';

  authService = inject(AuthService);
  healthService = inject(HealthService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Trigger backend health check on app startup
    this.healthService.checkDatabaseHealth().subscribe({
      next: () => {},
      error: () => {
        // Error notifications (e.g., 503) are shown by the global NotificationInterceptor
      }
    });
  }

  isNewMatchRoute(): boolean {
    return this.router.url.includes('/new');
  }
  isAuthorized() {
    return this.authService.isAuthenticated();
  }
}
