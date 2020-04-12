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

        dispatch(registerUserSuccessAction(User.create(payload.User)));
    } catch(e) {
        dispatch(registerUserErrorAction(e));

        Swal.fire({
            title: 'Error!',
            text: 'There was an error on register!',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
