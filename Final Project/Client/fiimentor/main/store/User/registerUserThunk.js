import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    registerUserAction,
    registerUserErrorAction,
    registerUserSuccessAction,
} from './userActions';

import {User} from '../../core/domain/User';
import {Context} from '../../Context';
import type { RegisterUserRequest } from '../../core/services/ApiService';

export  const registerUserThunk = (userCredentials: RegisterUserRequest)=> async(
    dispatch: Dispatch
)=>{
    try{
        dispatch(registerUserAction());

        const user: User = await Context.apiService.registerUser(userCredentials);

        dispatch(registerUserSuccessAction(user));
    } catch(e) {
        dispatch(registerUserErrorAction(e));

        Swal.fire({
            title: 'Error!',
            text: 'There was an error on register!',
            type: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
