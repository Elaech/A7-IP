import {Action} from 'redux';

export const SearchActions = {
  SEARCH_POST : 'SEARCH_POST',
  SEARCH_POST_SUCCESS : 'SEARCH_POST_SUCCESS',
  SEARCH_POST_ERROR  : 'SEARCH_POST_ERROR',

};

export interface CreateSearchAction extends Action{
  type: SearchActions.SEARCH_POST;
};

export interface CreateSearchSuccessAction extends Action{
  type: SearchActions.SEARCH_POST_SUCCESS;
  payload: Postare[];
};

export interface CreateSearchErrorAction extends Action {
  type: SearchtActions.SEARCH_POST_ERROR;
  payload: Error;
}


export const createSearchAction = (): CreateSearchAction => ({
  type: SearchActions.CREATE_SEARCH,
});

export const createSearchSuccessAction = (payload: Postare[]): CreateSearchSuccessAction => ({
  type: SearchActions.CREATE_SEARCH_SUCCESS,
  payload,
});

export const createSearchErrorAction = (payload?: Error): CreateSearchErrorAction => ({
  type: SearchActions.CREATE_SEARCH_ERROR,
  payload,
});


