import {Action} from 'redux';

export const SearchActions = {
  CREATE_SEARCH : 'CREATE_SEARCH',
  CREATE_SEARCH_SUCCESS : 'CREATE_SEARCH_SUCCESS',
  CREATE_SEARCH_ERROR  : 'CREATE_SEARCH_ERROR',

};

export interface CreateSearchAction extends Action{
  type: SearchActions.CREATE_SEARCH;
};

export interface CreateSearchSuccessAction extends Action{
  type: SearchActions.CREATE_SEARCH_SUCCESS;
};

export interface CreateSearchErrorAction extends Action {
  type: SearchtActions.CREATE_SEARCH_ERROR;
  payload: Error;
}


export const createSearchAction = (): CreateSearchAction => ({
  type: SearchActions.CREATE_SEARCH,
});

export const createSearchSuccessAction = (): CreateSearchSuccessAction => ({
  type: SearchActions.CREATE_SEARCH_SUCCESS,
});

export const createSearchErrorAction = (payload?: Error): CreateSearchErrorAction => ({
  type: SearchActions.CREATE_SEARCH_ERROR,
  payload,
});


