import {Action} from 'redux';
import {Postare} from '../../core/domain/Postare';

export const PostActions = {
  CREATE_POST : 'CREATE_POST',
  CREATE_POST_SUCCESS : 'CREATE_POST_SUCCESS',
  CREATE_POST_ERROR  : 'CREATE_POST_ERROR',
  GET_POST: 'GET_POST',
  GET_POST_SUCCESS: 'GET_POST_SUCCESS',
  GET_POST_ERROR: 'GET_POST_ERROR',
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

export interface GetPostAction extends Action {
  type: PostActions.GET_POST;
}

export interface GetPostSuccessAction extends Action {
  type: PostActions.GET_POST_SUCCESS;
  payload: Postare;
}

export interface GetPostErrorAction extends Action {
  type: PostActions.GET_POST_ERROR;
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

export const getPostAction = (): GetPostAction => ({
  type: PostActions.GET_POST,
});

export const getPostSuccessAction = (payload: Postare): GetPostSuccessAction => ({
  type: PostActions.GET_POST_SUCCESS,
  payload,
});

export const getPostErrorAction = (payload?: Error): GetPostErrorAction => ({
  type: PostActions.GET_POST_ERROR,
  payload,
});


