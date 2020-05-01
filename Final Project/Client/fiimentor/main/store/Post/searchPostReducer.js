import {Postare} from '../../core/domain/Postare';

import { SET_INITIAL_STATE, SetInitialStateAction } from '../setInitialStateAction';

import {SearchPostAction, SearchPostSuccessAction, SearchPostErrorAction, SearchActions} from './searchActions';


type ActionType =
    | SetInitialStateAction
    | SearchPostSuccessAction
    | SearchPostErrorAction
    | SearchPostAction
    ;

export type SearchedPostsState = Postare[] | null;

const initialState: SearchedPostsState = [];

export const searchPostReducer = (state: SearchedPostsState = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_INITIAL_STATE:
            return initialState;
        case SearchActions.SEARCH_POST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
