import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../game/game.service';
import {Game} from '../game/game';
import {DialogComponent} from '../dialog/dialog.component';
import {MatchService} from '../match.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {MatchListComponent} from '../match-list/match-list.component';

@Component({
  selector: 'app-game-details',
  imports: [
    MatchListComponent,
    DialogComponent,
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit{

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  gameService = inject(GameService);
  game: Game | undefined
  openWarningDialog: boolean = false;
  matchAmount: number = 0;
  matchService = inject(MatchService)
  inputText: string = '';
  dialogInputIsValid: boolean = false;
  currentTab: string = 'Rules';


  ngOnInit(): void {
    this.gameService.getGameByToken(this.activatedRoute.snapshot.url[1].path)
      .subscribe({
        next: (game) => {
          this.game = game;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  openDialog() {
    this.matchService.getMatchCount(this.game?.token!).subscribe({
      next: (matchesAmount) => {
      this.matchAmount = matchesAmount;
      }
    });
    this.openWarningDialog = true;
  }

  closeDialog() {
    this.openWarningDialog = false;
    this.inputText = '';
    this.dialogInputIsValid = false
  }

  deleteGame(game: Game) {
      this.gameService.deleteGame(game.token).subscribe({
        next: (response) => {
            this.router.navigate(["/games"]);
        },
        error: (error) => {
          alert("Could not remove game with token it has either been deleted already or does not exist");
        }
      });
    this.closeDialog()
  }

  editGame(token: String) {
    this.router.navigate(["/games/edit", token])
  }

  goToGamesOverview() {
    this.router.navigate(['/games']);
  }

  isDialogInputValid() {
    this.dialogInputIsValid = this.game?.name === this.inputText;
  }

  changeTab(tab: string) {
    this.currentTab = tab;
  }

  protected readonly MatchListComponent = MatchListComponent;
}
