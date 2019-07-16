import { IUser } from './User';

export interface UserAuth {
  username: string;
  jwtToken: string;
  user: IUser;
}
