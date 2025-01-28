import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../game/game.service';
import {Game} from '../game/game';

@Component({
  selector: 'app-game-details',
  imports: [],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit{

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  gameService = inject(GameService);
  game: Game | undefined


  ngOnInit(): void {
    //TODO alternative that is not hardcoded?
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


  deleteGame(game: Game) {
    if (confirm("Are you sure you want to delete game with the following name: " + game.name)) {
      this.gameService.deleteGame(game.token).subscribe({
        next: (response) => {
            this.router.navigate(["/games"]);
        },
        error: (error) => {
          alert("Could not remove game with token it has either been deleted already or does not exist");
        }
      });
    }
  }

  editGame(token: String) {
    this.router.navigate(["/games/edit", token])
  }

  goToGamesOverview() {
    this.router.navigate(['/games']);
  }
}
