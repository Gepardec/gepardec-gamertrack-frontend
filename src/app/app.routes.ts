import { Routes } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameCreateFormComponent} from './game-create-form/game-create-form.component';
import {GameDetailComponent} from './game-detail/game-detail.component';
import {GameEditFormComponent} from './game-edit-form/game-edit-form.component';

export const routes: Routes = [
  {
    path: 'games/new',
    component: GameCreateFormComponent,
    title: "Create Game"
  },
  {
    path: 'games/edit/:id',
    component: GameEditFormComponent,
    title: "Edit Game",
  },
  {
    path: 'games/:id',
    component: GameDetailComponent,
    title: "Placeholder"
  },
  {
    path: 'games',
    component: GameComponent,
    title: "Games"
  },
];
