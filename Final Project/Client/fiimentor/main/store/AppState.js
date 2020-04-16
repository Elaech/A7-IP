//@flow
import {UserState} from './User/userReducer';
import type {UserToken} from './User/tokenReducer';
import type {ProfesoriState} from './Profesor/profesorReducer';

export interface AppState {
  User: UserState;
  Token: UserToken;
  profesori: ProfesoriState;
};

