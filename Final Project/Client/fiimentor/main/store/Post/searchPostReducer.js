import {Postare} from '../../core/domain/Postare';

import { SET_INITIAL_STATE, SetInitialStateAction } from '../setInitialStateAction';

import {SearchPostAction, SearchPostSuccessAction, SearchPostErrorAction, SearchPostsActions} from './searchPostsActions';


type ActionType =
    | SetInitialStateAction
    | SearchPostSuccessAction
    | SearchPostErrorAction
    | SearchPostAction
    ;

export interface SearchedPosts {
    posts?: Postare[];
    total?: number;
}


const initialState: SearchedPosts = {};

export const searchPostReducer = (state: SearchedPosts = initialState, action: ActionType) => {
    switch (action.type) {
        case SET_INITIAL_STATE:
            return initialState;
        case SearchPostsActions.SEARCH_POST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
