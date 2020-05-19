import type {SetInitialStateAction} from '../setInitialStateAction';
import type {
    GetNotificationsAction,
    GetNotificationsErrorAction,
    GetNotificationsSuccessAction
} from './notificationsActions';
import type {SearchedPosts} from '../Post/searchPostReducer';
import {GetNotificationsActions} from './notificationsActions';

type ActionType =
    | SetInitialStateAction
    | GetNotificationsAction
    | GetNotificationsSuccessAction
    | GetNotificationsErrorAction
    ;


const initialState: SearchedPosts = {};

export const notificationsReducer = (state: SearchedPosts = initialState, action: ActionType) => {
    switch(action.type) {
        case 'SET_INITIAL_STATE':
            return initialState;
        case GetNotificationsActions.GET_NOTIFICATIONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
