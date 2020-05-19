import {Dispatch} from 'redux';
import Swal from 'sweetalert2';

import {Context} from '../../Context';
import {Postare} from '../../core/domain/Postare';
import {
    getNotificationsAction,
    getNotificationsErrorAction,
    getNotificationsSuccessAction
} from './notificationsActions';

export const getNotificationsThunk =  (authorization: string) => async (
    dispatch: Dispatch
) => {
    try {

        dispatch(getNotificationsAction());

        const payload = await Context.apiService.getNotifications( authorization);
        const notifications = {
            total: payload.totalPosts,
            posts: payload.posts,
        };

        dispatch(getNotificationsSuccessAction(notifications));
    } catch (e) {
        dispatch(getNotificationsErrorAction(e));

    }
};
