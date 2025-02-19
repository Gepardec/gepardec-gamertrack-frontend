import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserListComponent} from './user/ui/user-list/user-list.component';
import {RouterModule} from '@angular/router';
import {HomeHeaderComponent} from './core/ui/home-header/home-header.component';
import {NotificationComponent} from './core/ui/notification/notification.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HomeHeaderComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gepardec-gamertrack-frontend';
}
