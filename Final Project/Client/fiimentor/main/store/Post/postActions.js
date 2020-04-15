import {Action} from 'redux';
import {Postare} from '../../core/domain/Postare';

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
};

export interface CreatePostErrorAction extends Action {
  type: PostActions.CREATE_POST_ERROR;
  payload: Error;
}


export const createPostAction = (): CreatePostAction => ({
  type: PostActions.CREATE_POST,
});

export const createPostSuccessAction = (): CreatePostSuccessAction => ({
  type: PostActions.CREATE_POST_SUCCESS,
});

export const createPostErrorAction = (payload?: Error): CreatePostErrorAction => ({
  type: PostActions.CREATE_POST_ERROR,
  payload,
});


