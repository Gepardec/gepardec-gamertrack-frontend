import {User} from './user';

export interface Score {
  token: string;
  user: User;
  score: number;
  defaultScore: boolean
}
