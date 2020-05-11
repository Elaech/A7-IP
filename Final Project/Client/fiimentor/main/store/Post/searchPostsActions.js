import {Action} from 'redux';
import {Postare} from '../../core/domain/Postare';

export const SearchPostsActions = {
  SEARCH_POST : 'SEARCH_POST',
  SEARCH_POST_SUCCESS : 'SEARCH_POST_SUCCESS',
  SEARCH_POST_ERROR  : 'SEARCH_POST_ERROR',

};

export interface SearchPostAction extends Action{
  type: SearchPostsActions.SEARCH_POST;
};

export interface SearchPostSuccessAction extends Action{
  type: SearchPostsActions.SEARCH_POST_SUCCESS;
  payload: Postare[];
};

export interface SearchPostErrorAction extends Action {
  type: SearchPostsActions.SEARCH_POST_ERROR;
  payload: Error;
}


export const searchPostAction = (): SearchPostAction => ({
  type: SearchPostsActions.SEARCH_POST,
});

export const searchPostSuccessAction = (payload: Postare[]): SearchPostSuccessAction => ({
  type: SearchPostsActions.SEARCH_POST_SUCCESS,
  payload,
});

export const searchPostErrorAction = (payload?: Error): SearchPostErrorAction => ({
  type: SearchPostsActions.SEARCH_POST_ERROR,
  payload,
});


