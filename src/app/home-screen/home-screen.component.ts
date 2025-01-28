import { Component } from '@angular/core';
import {RankListComponent} from '../rank-list/rank-list.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-screen',
  imports: [
    RankListComponent,
    RouterLink
  ],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

}
