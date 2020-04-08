import {Action} from 'redux';
import { User } from '../../core/domain/User';
import type { UserLogged } from '../../../global';

export const UserActions = {
  LOGIN_USER : 'LOGIN_USER',
  LOGIN_USER_SUCCESS : 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR  : 'LOGIN_USER_ERROR',
  REGISTER_USER : 'REGISTER_USER',
  REGISTER_USER_SUCCESS : 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR  : 'REGISTER_USER_ERROR',

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

export interface RegisterUserAction extends Action{
  type: UserActions.REGISTER_USER;
};

export interface RegisterUserSuccessAction extends Action{
  type: UserActions.REGISTER_USER_SUCCESS;
  payload: UserLogged;
};

export interface RegisterUserErrorAction extends Action {
  type: UserActions.REGISTER_USER_ERROR;
  payload: Error;
}

export const loginUserAction = (): LoginUserAction => ({
  type: UserActions.LOGIN_USER,
});

export const loginUserSuccessAction = (payload: User): LoginUserSuccessAction => ({
  type: UserActions.LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserErrorAction = (payload?: Error): LoginUserErrorAction => ({
  type: UserActions.LOGIN_USER_ERROR,
  payload,
});

export const registerUserAction = (): RegisterUserAction => ({
  type: UserActions.REGISTER_USER,
});

export const registerUserSuccessAction = (payload: UserLogged): RegisterUserSuccessAction => ({
  type: UserActions.REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserErrorAction = (payload?: Error): RegisterUserErrorAction => ({
  type: UserActions.REGISTER_USER_ERROR,
  payload,
});
