import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../../game.service';
import {Game} from '../../../core/models/game';
import {DialogComponent} from '../../../shared/ui/dialog/dialog.component';
import {MatchService} from '../../../match/match.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {MatchListComponent} from '../match-list/match-list.component';
import {AuthService} from '../../../core/auth/auth.service';

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
  matchService = inject(MatchService)
  authService = inject(AuthService);
  game: Game | undefined
  openWarningDialog: boolean = false;
  matchAmount: Number = 0;
  inputText: string = '';
  dialogInputIsValid: boolean = false;
  currentTab: string = 'Rules';


  ngOnInit(): void {
    this.gameService.getGameByToken(this.activatedRoute.snapshot.url[1].path)
      .subscribe({
        next: (game) => {
          this.game = game;
        },
      });
  }

  openDialog() {
    this.matchService.getMatchCount(this.game?.token!).then(matchAmount => {
      this.matchAmount = matchAmount;
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
        next: () => {
            this.router.navigate(["/games"]);
        },
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

  isAuthorized() {
    return this.authService.isAuthenticated();
  }
}
