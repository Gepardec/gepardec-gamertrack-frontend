import { Routes } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameCreateFormComponent} from './game-create-form/game-create-form.component';
import {GameDetailComponent} from './game-detail/game-detail.component';
import {GameEditFormComponent} from './game-edit-form/game-edit-form.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {HomeScreenComponent} from './home-screen/home-screen.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {MatchCreateComponent} from './match-create/match-create.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent, title: 'Home' },
  { path: 'users', component: UserListComponent, title: 'AllUser' },
  { path: 'details/:token', component: UserDetailsComponent, title: 'user' },
  { path: 'updateUser/:token', component: UpdateUserComponent, title: 'Update User' },
  { path: 'new', component: CreateUserComponent, title: 'Create User' },
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
  {
    path: 'matches/new',
    component: MatchCreateComponent,
    title: 'Create match'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  }
];
