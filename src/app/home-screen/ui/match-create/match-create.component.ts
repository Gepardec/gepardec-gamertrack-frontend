import {Component, inject, OnInit} from '@angular/core';
import {GameService} from '../../../game/game.service';
import {Game} from '../../../core/models/game';
import {GameListComponent} from '../../../shared/ui/game-list/game-list.component';
import {User} from '../../../core/models/user';
import {NgForOf, NgIf} from '@angular/common';
import {UserService} from '../../../user/user.service';
import {MatchService} from '../../../match/match.service';
import {DialogComponent} from '../../../shared/ui/dialog/dialog.component';
import {Router} from '@angular/router';

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

  throwErrorAlert?: boolean = false;


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
    this.selectedGame != null && this.selectedUsers.length > 1
      ? this.matchService.createMatch({game: this.selectedGame, users: this.selectedUsers})
        .subscribe({
          next: () => {
            this.router.navigate(["/"])
          },
        })
      : alert("No game or users have been selected");
  }

  ifValidOpenDialog(): boolean {
    let isValid= this.selectedGame != undefined && this.selectedUsers.length > 1 ;
    this.throwErrorAlert = !isValid
    this.openDialog = isValid;
    return isValid
  }

  ifValidCloseAlert() {
    this.throwErrorAlert = this.selectedGame != undefined && this.selectedUsers.length > 1
  }

  closeDialog() {
    this.openDialog = false;
  }

}
