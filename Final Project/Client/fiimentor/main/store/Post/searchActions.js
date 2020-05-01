import {Action} from 'redux';
import {Postare} from '../../core/domain/Postare';

export const SearchActions = {
  SEARCH_POST : 'SEARCH_POST',
  SEARCH_POST_SUCCESS : 'SEARCH_POST_SUCCESS',
  SEARCH_POST_ERROR  : 'SEARCH_POST_ERROR',

};

export interface SearchPostAction extends Action{
  type: SearchActions.SEARCH_POST;
};

export interface SearchPostSuccessAction extends Action{
  type: SearchActions.SEARCH_POST_SUCCESS;
  payload: Postare[];
};

export interface SearchPostErrorAction extends Action {
  type: SearchActions.SEARCH_POST_ERROR;
  payload: Error;
}


export const searchPostAction = (): SearchPostAction => ({
  type: SearchActions.SEARCH_POST,
});

export const searchPostSuccessAction = (payload: Postare[]): SearchPostSuccessAction => ({
  type: SearchActions.SEARCH_POST_SUCCESS,
  payload,
});

export const searchPostErrorAction = (payload?: Error): SearchPostErrorAction => ({
  type: SearchActions.SEARCH_POST_ERROR,
  payload,
});


