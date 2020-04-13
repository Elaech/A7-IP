import {User} from '../../core/domain/User';
import {
  SET_INITIAL_STATE,
  SetInitialStateAction,
} from '../setInitialStateAction';

import {
  LoginUserAction,
  LoginUserErrorAction,
  LoginUserSuccessAction,
  RegisterUserAction,
  RegisterUserErrorAction,
  RegisterUserSuccessAction,
  UserActions,
} from './userActions';

type ActionType =
  | SetInitialStateAction
  | LoginUserAction
  | LoginUserErrorAction
  | LoginUserSuccessAction
  | RegisterUserAction
  | RegisterUserErrorAction
  | RegisterUserSuccessAction;

export type UserState = User | null;

const initialState: UserState = null;

export const userReducer = (
  state: UserState = initialState,
  action: ActionType,
): UserState => {
    switch (action.type) {
      case 'SET_INITIAL_STATE':
        return initialState;
      case UserActions.LOGIN_USER_SUCCESS:
        return action.payload;
      case UserActions.REGISTER_USER_SUCCESS:
        return action.payload;
      default:
        return state;
    }
};
