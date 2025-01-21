import {Component, inject, OnInit} from '@angular/core';
import {GameService} from '../game/game.service';
import {Game} from '../game/game';
import {GameListComponent} from '../game-list/game-list.component';
import {User} from '../user';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../user.service';
import {MatchService} from '../match.service';

@Component({
  selector: 'app-match-create',
  imports: [
    GameListComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './match-create.component.html',
  styleUrl: './match-create.component.css'
})
export class MatchCreateComponent implements OnInit {


  gameService = inject(GameService);
  userService = inject(UserService);
  matchService = inject(MatchService);

  userList: User[] = [];
  gameList: Game[] = [];

  selectedGame: Game | undefined;
  selectedUsers: User[] = [];


  ngOnInit() {
    this.gameService.getAllGames().subscribe(games => this.gameList = games);
    this.userService.getAllActivatedUsers().subscribe(users => this.userList = users);
  }

  onGameSelect($event: Game) {
    this.selectedGame = $event
  }

  onUserSelect(user: User) {
    this.selectedUsers.push(user)
  }

  onUserDeselect(user: User) {
    const index = this.selectedUsers.indexOf(user)
    if (index > -1) {
      this.selectedUsers.splice(index, 1)
    }
  }

  createMatch() {
    this.selectedGame && this.selectedUsers.length > 0 ?
    this.matchService.createMatch( { game: this.selectedGame, users: this.selectedUsers}).subscribe()
      : alert("No game or users have been selected")
  }
}
