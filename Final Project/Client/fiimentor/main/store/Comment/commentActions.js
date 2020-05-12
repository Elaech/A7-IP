import {Action} from 'redux';
import {Comment} from '../../core/domain/Comment';

export const CommentActions = {
  CREATE_COMMENT : 'CREATE_COMMENT',
  CREATE_COMMENT_SUCCESS : 'CREATE_COMMENT_SUCCESS',
  CREATE_COMMENT_ERROR  : 'CREATE_COMMENT_ERROR',

};

export interface CreateCommentAction extends Action{
  type: CommentActions.CREATE_COMMENT;
};

export interface CreateCommentSuccessAction extends Action{
  type: CommentActions.CREATE_COMMENT_SUCCESS;
};

export interface CreateCommentErrorAction extends Action {
  type: CommentActions.CREATE_COMMENT_ERROR;
  payload: Error;
}


export const createCommentAction = (): CreateCommentAction => ({
  type: CommentActions.CREATE_COMMENT,
});

export const createCommentSuccessAction = (): CreateCommentSuccessAction => ({
  type: CommentActions.CREATE_COMMENT_SUCCESS,
});

export const createCommentErrorAction = (payload?: Error): CreateCommentErrorAction => ({
  type: CommentActions.CREATE_COMMENT_ERROR,
  payload,
});


