import { Routes } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameCreateFormComponent} from './game-create-form/game-create-form.component';

export const routes: Routes = [
  {
    path: 'games/new',
    component: GameCreateFormComponent,
    title: "Create Game"
  },
  {
    path: 'games',
    component: GameComponent,
    title: "Games"
  },
];
