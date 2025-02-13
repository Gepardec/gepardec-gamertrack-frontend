import {Game} from './game/game';
import {User} from './user';

export interface Match {
  token: string
  game: Game
  users: User[]
}

export interface CreateMatch {
  game: Game
  users: User[]
}
