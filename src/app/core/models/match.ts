import {Game} from './game';
import {User} from './user';

export interface Match {
  token: string
  createdOn: string
  updatedOn: string
  game: Game
  users: User[]
}

export interface CreateMatch {
  game: Game
  users: User[]
}
