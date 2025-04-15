import { Routes } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameCreateFormComponent} from './game/ui/game-create-form/game-create-form.component';
import {GameDetailComponent} from './game/ui/game-detail/game-detail.component';
import {GameEditFormComponent} from './game/ui/game-edit-form/game-edit-form.component';
import {UserListComponent} from './user/ui/user-list/user-list.component';
import {UserDetailsComponent} from './user/ui/user-details/user-details.component';
import {CreateUserComponent} from './user/ui/create-user/create-user.component';
import {HomeScreenComponent} from './home-screen/home-screen.component';
import {UpdateUserComponent} from './user/ui/update-user/update-user.component';
import {MatchCreateComponent} from './home-screen/ui/match-create/match-create.component';
import {LoginComponent} from './login/login.component';
import {RankListComponent} from './rank-list/rank-list.component';
import {AuthGuard} from './core/auth/auth.guard';
import {StatisticsComponent} from './user/ui/statistics/statistics.component';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent, title: 'Home' },
  { path: 'users', component: UserListComponent, title: 'AllUser', canActivate: [AuthGuard] },
  { path: 'users/stats/:token', component: StatisticsComponent, title: "User Statistics", canActivate: [AuthGuard]},
  { path: 'users/details/:token', component: UserDetailsComponent, title: 'user', canActivate: [AuthGuard] },
  { path: 'users/update/:token', component: UpdateUserComponent, title: 'Update User', canActivate: [AuthGuard] },
  { path: 'users/new', component: CreateUserComponent, title: 'Create User', canActivate: [AuthGuard] },
  {
    path: 'games/new',
    component: GameCreateFormComponent,
    title: "Create Game",
    canActivate: [AuthGuard]
  },
  {
    path: 'games/edit/:id',
    component: GameEditFormComponent,
    title: "Edit Game",
    canActivate: [AuthGuard]
  },
  {
    path: 'games/:id',
    component: GameDetailComponent,
    title: "Game Detail"
  },
  {
    path: 'games',
    component: GameComponent,
    title: "Games"
  },
  {
    path: 'matches/new',
    component: MatchCreateComponent,
    title: 'Create match',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'ranklist',
    component: RankListComponent,
    title: 'Rangliste'
  }
];
