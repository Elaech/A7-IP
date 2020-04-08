import { Action } from 'redux';

export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

export interface SetInitialStateAction extends Action {
  type: typeof SET_INITIAL_STATE;
}

export const setInitialStateAction = (): SetInitialStateAction => ({
  type: SET_INITIAL_STATE,
});
