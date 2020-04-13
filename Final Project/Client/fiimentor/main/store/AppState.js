//@flow
import {UserState} from './User/userReducer';
import type {UserToken} from './User/tokenReducer';

export interface AppState {
  User: UserState;
  Token: UserToken;
};

