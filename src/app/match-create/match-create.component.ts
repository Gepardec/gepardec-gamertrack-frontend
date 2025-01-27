import {Component, inject, OnInit} from '@angular/core';
import {GameService} from '../game/game.service';
import {Game} from '../game/game';
import {GameListComponent} from '../game-list/game-list.component';
import {User} from '../user';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../user.service';
import {MatchService} from '../match.service';
import {DialogComponent} from '../dialog/dialog.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-match-create',
  imports: [
    GameListComponent,
    NgForOf,
    NgIf,
    DialogComponent
  ],
  templateUrl: './match-create.component.html',
  styleUrl: './match-create.component.css'
})
export class MatchCreateComponent implements OnInit {


  gameService = inject(GameService);
  userService = inject(UserService);
  matchService = inject(MatchService);
  router = inject(Router)

  userList: User[] = [];
  gameList: Game[] = [];

  selectedGame: Game | undefined;
  selectedUsers: User[] = [];

  openDialog: boolean = false;


  ngOnInit() {
    this.gameService.getAllGames().subscribe(games => this.gameList = games);
    this.userService.getAllActivatedUsers().subscribe(users => this.userList = users);
  }

  onGameSelect($event: Game) {
    this.selectedGame === $event ? this.selectedGame = undefined : this.selectedGame = $event
  }

  onUserSelect(user: User) {
    const index = this.selectedUsers.indexOf(user);
      index > -1 ? this.selectedUsers.splice(index, 1) : this.selectedUsers.push(user)
  }

  onUserDeselect(user: User) {
    const index: number = this.selectedUsers?.indexOf(user)
    if (index > -1) {
      this.selectedUsers.splice(index, 1)
    }
  }

  createMatch() {
    console.log('creating match')
    this.closeDialog()
    this.selectedGame != null && this.selectedUsers.length > 1 ?
      this.matchService.createMatch({game: this.selectedGame, users: this.selectedUsers})
        .subscribe({
          next: match => {
            this.router.navigate(["/"])
          },
          error: err => {
            console.log("Could not create game: " + err)
          }
        })
      : alert("No game or users have been selected");
  }

  isSelectionValid(): boolean {
    return this.selectedGame != undefined && this.selectedUsers.length > 1;
  }

  createDialog() {
    this.openDialog = true
  }

  closeDialog() {
    this.openDialog = false;
  }

}
