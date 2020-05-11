import {
    GetPostAction,
    GetPostSuccessAction,
    GetPostErrorAction, PostActions,
} from './postActions';
import {Postare} from '../../core/domain/Postare';
import type {SetInitialStateAction} from '../setInitialStateAction';

type ActionType =
    | SetInitialStateAction
    | GetPostSuccessAction
    | GetPostErrorAction
    | GetPostAction
    ;
export type PostState = Postare | null;

const initialState: PostState = null;

export const postReducer = (state: PostState = initialState, action: ActionType) => {
    switch(action.type) {
        case 'SET_INITIAL_STATE':
            return initialState;
        case PostActions.GET_POST_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
