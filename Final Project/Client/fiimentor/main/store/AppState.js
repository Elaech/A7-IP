//@flow
import {UserState} from './User/userReducer';
import type {UserToken} from './User/tokenReducer';
import type {ProfesoriState} from './Profesor/profesorReducer';
import type {SearchedPostsState} from './Post/searchPostReducer';

export interface AppState {
  user: UserState;
  token: UserToken;
  profesori: ProfesoriState;
  searchedPosts: SearchedPostsState
};

