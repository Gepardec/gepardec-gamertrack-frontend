import {Component, inject, Input, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatchService} from '../../../match/match.service';
import {Match} from '../../../core/models/match';
import {Game} from '../../../core/models/game';
import {UserService} from "../../../user/user.service";
import {User} from "../../../core/models/user";
import {DateFormatterService} from '../../../shared/utility/date-formatter.service';

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
  dateFormatterService= inject(DateFormatterService);

  matches: Match[] = [];
  @Input() game: Game | undefined;
  errorMessage: any;

  async ngOnInit() {
    this.matchService.getXAmountOfLastMatches(this.game?.token!, this.selectedValue).subscribe({
      next: (match: Match[]) => {
        this.matches = match;
      },
    });
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }


  refreshMatches(value: number) {

    if (this.selectedUser) {
      this.matchService.getXAmountOfLastMatchesForUser(this.game?.token!, this.selectedValue, this.selectedUser?.token!).subscribe({
        next: (match: Match[]) => {
          this.matches = match;
        },
      });
    } else {
      this.matchService.getXAmountOfLastMatches(this.game?.token!, value).subscribe({
        next: (match: Match[]) => {
          this.matches = match;
        },
      });
    }
  }

    selectValue(value: number) {
      this.selectedValue = value;
      this.refreshMatches(value);
    }

    selectUser(user: User|undefined) {
        this.selectedUser = user;
      this.refreshMatches(this.selectedValue);
    }
  }
