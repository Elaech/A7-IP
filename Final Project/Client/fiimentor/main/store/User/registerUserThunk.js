import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    registerUserAction,
    registerUserErrorAction,
    registerUserSuccessAction,
} from './userActions';

import {Context} from '../../Context';
import type { RegisterUserRequest } from '../../core/services/ApiService';
import {User} from '../../core/domain/User';
import {setUserTokenThunk} from './setUserTokenThunk';
import {errorResponse} from '../../services/AxiosService';

interface Payload {
    token: string;
    User: User;
}

export  const registerUserThunk = (userCredentials: RegisterUserRequest)=> async(
    dispatch: Dispatch
)=>{
    try{
        dispatch(registerUserAction());

        const payload: Payload = await Context.apiService.registerUser(userCredentials);

        await setUserTokenThunk(payload.token)(dispatch);

        const user = User.create(payload.User)
        dispatch(registerUserSuccessAction(user));
        sessionStorage.setItem('user', user);


        await Context.routerService.replace('/homepage');
    } catch(e) {
        dispatch(registerUserErrorAction(e));

        Swal.fire({
            title: 'Error!',
            text: ` ${errorResponse.error} `,
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
