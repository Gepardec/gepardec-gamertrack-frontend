import {Component, Inject, inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {GameService} from '../../game.service';
import {Game, UpdateGame} from '../../../shared/models/game';
import {rule} from 'postcss';
import {GameComponent} from '../../game.component';
import {Subscription} from 'rxjs';
import {GameCreateFormComponent} from '../game-create-form/game-create-form.component';

@Component({
  selector: 'app-game-edit-form',
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './game-edit-form.component.html',
  styleUrl: './game-edit-form.component.css'
})
export class GameEditFormComponent implements OnInit{

  activeRoute = inject(ActivatedRoute)
  gameService = inject(GameService);
  router = inject(Router)
  game?: Game;
  gameReceived?: Subscription;
  updateGameForm!: FormGroup

  constructor() {
    this.updateGameForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern("(.|\\s)*\\S(.|\\s)*")
      ]),
      rules: new FormControl(''),
    });
  }

  ngOnInit() {
    let gameToken = this.activeRoute.snapshot.url[2].path

    this.gameService.getGameByToken(gameToken).subscribe({
      next: (game) => {
        if (game)
          this.game = game;
        this.updateGameForm.patchValue({...this.game})
      },
      error: (error) => {
        alert("Game with token: " + gameToken +
          " does not exist")
        this.router.navigate(['/games'])
      }});
  }

  submitEditedGame() {


    let updateGame: UpdateGame = { ... this.updateGameForm.value}
    this.gameService.updateGame(updateGame, this.game?.token ?? ""  ).subscribe({
      next: (game) => {
        this.router.navigate(["/games", game.token]
        );
      },
      error: (error) => {
        console.log(error);
      }})

  }

  get name() {
    return this.updateGameForm?.get("name")!;
  }

}
