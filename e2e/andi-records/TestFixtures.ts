import {User} from '../../src/app/core/models/user';
import {Game} from '../../src/app/core/models/game';

export const BASE_URL  = 'localhost:4200';


export const game = {
  "token": "1lsdkajflkas",
  "name": "Dart",
  "rules": "split half score",
}

export const user1  = {
  "token": 'lkasdsdjkasd',
  "firstname": 'Erhard',
  "lastname": 'Siegl',
  "deactivated": false,
}

export const user2 = {
  "token": 'lkasdsdjkasd1',
  "firstname": 'Andreas',
  "lastname": 'Novak',
  "deactivated": false,
}


export const match = (user1: User, user2: User, game: Game) => {
  return {
    "token": "asdjlasdjfasd",
    "createdOn": new Date(),
    "updatedOn": new Date(),
    "game": game,
    "users": [
      user1,
      user2
      ]
  }
}

