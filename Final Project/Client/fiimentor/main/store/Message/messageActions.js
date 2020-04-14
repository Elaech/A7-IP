import {Action} from 'redux';
import { User } from '../../core/domain/User';
import type { UserLogged } from '../../../global';

export const MessageActions = {
  CREATE_POST : 'CREATE_POST',
  CREATE_POST_SUCCESS : 'CREATE_POST_SUCCESS',
  CREATE_POST_ERROR  : 'CREATE_POST_ERROR',

};

export interface CreateMessageAction extends Action{
  type: MessageActions.CREATE_POST;
};

export interface CreateMessageSuccessAction extends Action{
  type: MessageActions.CREATE_POST_SUCCESS;
  payload: Postare;
};

export interface CreateMessageErrorAction extends Action {
  type: MessageActions.CREATE_POST_ERROR;
  payload: Error;
}


export const createMessageAction = (): CreateMessageAction => ({
  type: MessageActions.CREATE_POST,
});

export const createMessageSuccessAction = (payload: Postare): CreateMessageSuccessAction => ({
  type: MessageActions.CREATE_POST_SUCCESS,
  payload,
});

export const createMessageErrorAction = (payload?: Error): CreateMessageErrorAction => ({
  type: MessageActions.CREATE_POST_ERROR,
  payload,
});


