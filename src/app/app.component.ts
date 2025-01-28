import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {RouterModule} from '@angular/router';
import {HomeHeaderComponent} from './home-header/home-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, HomeHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gepardec-gamertrack-frontend';
}
