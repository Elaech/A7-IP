import {Action} from 'redux';
import { User } from '../../core/domain/User';

export type UserActions = {
  LOGIN_USER : 'LOGIN_USER',
  LOGIN_USER_SUCCESS : 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR  : 'LOGIN_USER_ERROR',

};

export interface LoginUserAction extends Action{
  type: UserActions.LOGIN_USER;
};

export interface LoginUserSuccessAction extends Action{
  type: UserActions.LOGIN_USER_SUCCESS;
  payload: User;
};

export interface LoginUserErrorAction extends Action {
  type: UserActions.LOGIN_USER_ERROR;
  payload: Error;
}


export const loginUserAction = (): LoginUserAction => ({
  type: UserActions.LOGIN_USER,
});

export const loginUserSuccessAction = (payload: User): LoginUserSuccessAction => ({
  type: UserActions.LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserErrorAction = (payload: Error): LoginUserErrorAction => ({
  type: UserActions.LOGIN_USER_ERROR,
  payload,
});

