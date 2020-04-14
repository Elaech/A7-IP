import {Action} from 'redux';
import { User } from '../../core/domain/User';
import type { UserLogged } from '../../../global';

export const PostActions = {
  CREATE_POST : 'CREATE_POST',
  CREATE_POST_SUCCESS : 'CREATE_POST_SUCCESS',
  CREATE_POST_ERROR  : 'CREATE_POST_ERROR',

};

export interface CreatePostAction extends Action{
  type: PostActions.CREATE_POST;
};

export interface CreatePostSuccessAction extends Action{
  type: PostActions.CREATE_POST_SUCCESS;
  payload: Postare;
};

export interface CreatePostErrorAction extends Action {
  type: PostActions.CREATE_POST_ERROR;
  payload: Error;
}


export const createPostAction = (): CreatePostAction => ({
  type: PostActions.CREATE_POST,
});

export const createPostSuccessAction = (payload: Postare): CreatePostSuccessAction => ({
  type: PostActions.CREATE_POST_SUCCESS,
  payload,
});

export const createPostErrorAction = (payload?: Error): CreatePostErrorAction => ({
  type: PostActions.CREATE_POST_ERROR,
  payload,
});


