export interface Game {
  token: string
  name: string,
  rules: string
}

export interface CreateGame {
  name: string,
  rules: string
}

export interface UpdateGame {
  name: string,
  rules: string
}
