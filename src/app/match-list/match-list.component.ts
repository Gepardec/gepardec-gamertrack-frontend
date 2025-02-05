import {Component, inject, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatchService} from '../match.service';
import {Match} from '../match';
import {Game} from '../game/game';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-match-list',
  imports: [
    FormsModule
  ],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent implements OnInit {
  valueOptions: number[] = [5, 10, 20, 40, 80, 100];
  selectedValue: number = this.valueOptions[0];
  users: User[] = [];
  selectedUser: User | undefined;
  throwAlert: boolean = false;

  matchService = inject(MatchService);
  userService = inject(UserService);

  matches: Match[] = [];
  @Input() game: Game | undefined;
  errorMessage: any;

  async ngOnInit() {
    this.matchService.getXAmountOfLastMatches(this.game?.token!, this.selectedValue).subscribe({
      next: (match: Match[]) => {
        this.matches = match;
      },
      error: err => {
        console.log(err)
        this.throwAlert=true;
        this.errorMessage = 'Something went wrong while fetching matches. Try again later.';
      }
    });
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log(this.selectedUser)
        users.forEach(user => console.log(user))
        this.users = users;
      },
      error: err => {
        this.throwAlert=true;
        this.errorMessage = 'Something went wrong while fetching matches. Try again later.';
      }
    });
  }


  refreshMatches(value: number, user?: User) {
    console.log('making request')
    if (this.selectedUser) {
      this.matchService.getXAmountOfLastMatchesForUser(this.game?.token!, this.selectedValue, this.selectedUser?.token!).subscribe({
        next: (match: Match[]) => {
          this.matches = match;
        },
        error: err => {
          this.throwAlert=true;
          this.errorMessage = 'Something went wrong while fetching matches. Try again later.';
        }
      });
    } else {
      this.matchService.getXAmountOfLastMatches(this.game?.token!, value).subscribe({
        next: (match: Match[]) => {
          this.matches = match;
        },
        error: err => {
          this.throwAlert=true;
          this.errorMessage = 'Something went wrong while fetching matches. Try again later.';
        }
      });
    }
  }

    selectValue(value: number) {
      this.selectedValue = value;
      this.refreshMatches(value, undefined);
    }

    selectUser(user: User) {
        this.selectedUser = user;
      this.refreshMatches(this.selectedValue, this.selectedUser);
    }

  }
