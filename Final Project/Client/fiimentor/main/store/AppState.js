//@flow
import {UserState} from './User/userReducer';
import type {UserToken} from './User/tokenReducer';
import type {ProfesoriState} from './Profesor/profesorReducer';

export interface AppState {
  user: UserState;
  token: UserToken;
  profesori: ProfesoriState;
};

