import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {GameService} from '../../game.service';
import {Game, UpdateGame} from '../../../core/models/game';

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
    });
  }

  submitEditedGame() {


    let updateGame: UpdateGame = {...this.updateGameForm.value}
    this.gameService.updateGame(updateGame, this.game?.token ?? "").subscribe({
      next: (game) => {
        this.router.navigate(["/games", game.token]
        );
      },
    });
  }

    get
    name()
    {
      return this.updateGameForm?.get("name")!;
    }

  }
