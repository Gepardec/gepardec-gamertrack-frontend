import {Component, inject, OnInit} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {GameService} from '../../game.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-create-form',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './game-create-form.component.html',
  styleUrl: './game-create-form.component.css'
})
export class GameCreateFormComponent implements OnInit{

  router = inject(Router)

  createGameForm!: FormGroup;

  gameService = inject(GameService)

  ngOnInit() {
    this.createGameForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern("(.|\\s)*\\S(.|\\s)*")
      ]),
      rules: new FormControl('')
    });
  }


  submitNewGame() {
    this.gameService.createGame(
      this.createGameForm.value.name ?? '',
      this.createGameForm.value.rules ?? ''
    ).subscribe({
      next: (game) => {
        this.router.navigate(["/games", game.token]
        );
      },
    });
  }

  get name() {
    return this.createGameForm?.get("name")!;
  }

}
