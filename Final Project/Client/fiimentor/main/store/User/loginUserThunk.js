import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
  loginUserAction,
  loginUserErrorAction,
  loginUserSuccessAction,
} from './userActions';

import {User} from '../../core/domain/User';
import {Context} from '../../Context';
import type { LoginUserRequest } from '../../core/services/ApiService';

export  const loginUserThunk = (userCredentials: LoginUserRequest)=> async(
  dispatch: Dispatch
)=>{
   try{
     dispatch(loginUserAction());

     const user: User = await Context.apiService.loginUser(userCredentials);

     dispatch(loginUserSuccessAction(user));
   } catch(e) {
     dispatch(loginUserErrorAction(e));

     Swal.fire({
       title: 'Error!',
       text: 'There was an error on login!',
       type: 'error',
       confirmButtonText: 'Ok',
     })
   }
};
