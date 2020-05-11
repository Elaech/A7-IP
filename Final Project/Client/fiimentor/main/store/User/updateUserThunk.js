import { Dispatch } from 'redux';
import Swal from 'sweetalert2';
import {
    updateUserAction,
    updateUserErrorAction,
    updateUserSuccessAction,
} from './userActions';

import { Context } from '../../Context';
import { User } from '../../core/domain/User';
import { setUserTokenThunk } from './setUserTokenThunk';
import { errorResponse } from '../../services/AxiosService';

interface Payload {
    token: string;
    User: User;
}

export const updateUserThunk = (userUpdate: UpdateUserRequest) => async (
    dispatch: Dispatch
) => {
    try {
        dispatch(updateUserAction());

        const payload: Payload = await Context.apiService.updateUser(userUpdate);

        await setUserTokenThunk(payload.token)(dispatch);

        const user = User.create(payload.User)
        dispatch(updateUserSuccessAction(user));
        sessionStorage.setItem('user', user);

        await Context.routerService.replace('/homepage');
    } catch (e) {
        dispatch(updateUserErrorAction(e));

        await Swal.fire({
            title: 'Error!',
            text: ` ${errorResponse.message} `,
            type: 'error',
            confirmButtonText: 'Ok',
            icon: 'error',
          })
    }
};