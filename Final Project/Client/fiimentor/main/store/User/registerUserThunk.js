import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    registerUserAction,
    registerUserErrorAction,
    registerUserSuccessAction,
} from './userActions';

import {Context} from '../../Context';
import type { RegisterUserRequest } from '../../core/services/ApiService';
import type { UserLogged } from '../../../global';

export  const registerUserThunk = (userCredentials: RegisterUserRequest)=> async(
    dispatch: Dispatch
)=>{
    try{
        dispatch(registerUserAction());

        const user: UserLogged = await Context.apiService.registerUser(userCredentials);

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
