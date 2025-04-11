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
}

export const user2 = {
  "token": 'lkasdsdjkasd1',
  "firstname": 'Andreas',
  "lastname": 'Novak',
}


export const match = (user1, user2, game) => {
  return {
    "token": "asdjlasdjfasd",
    "createdOn": "2023-10-01 12:00:00",
    "updatedOn": "2023-10-01 12:00:00",
    "game": JSON.stringify(game),
    "users": [
      JSON.stringify(user1),
      JSON.stringify(user2)
      ]
  }
}

