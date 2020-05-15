import {Action} from 'redux';
import type {SearchedPosts} from '../Post/searchPostReducer';

export const GetNotificationsActions = {
    GET_NOTIFICATIONS : 'GET_NOTIFICATIONS',
    GET_NOTIFICATIONS_SUCCESS: 'GET_NOTIFICATIONS_SUCCESS',
    GET_NOTIFICATIONS_ERROR: 'GET_NOTIFICATIONS_ERROR',
};

export interface GetNotificationsAction extends Action {
    type: GetNotificationsActions.GET_NOTIFICATIONS;
}

export interface GetNotificationsSuccessAction extends Action {
    type: GetNotificationsActions.GET_NOTIFICATIONS_SUCCESS;
    payload: SearchedPosts;
}

export interface GetNotificationsErrorAction extends Action {
    type: GetNotificationsActions.GET_NOTIFICATIONS_ERROR;
    payload?: Error;
}

export const getNotificationsAction = (): GetNotificationsAction =>({
    type: GetNotificationsActions.GET_NOTIFICATIONS
});

export const getNotificationsSuccessAction = (payload: SearchedPosts) =>({
    type: GetNotificationsActions.GET_NOTIFICATIONS_SUCCESS,
    payload,
});

export const getNotificationsErrorAction = (payload?: Error): GetNotificationsErrorAction => ({
    type: GetNotificationsActions.GET_NOTIFICATIONS_ERROR,
    payload,
});
