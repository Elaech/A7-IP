import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
  loginUserAction,
  loginUserErrorAction,
  loginUserSuccessAction,
} from './userActions';

import {Context} from '../../Context';
import type { LoginUserRequest } from '../../core/services/ApiService';
import type {UserLogged} from '../../../global';
import {Student} from '../../core/domain/Student';
import {Profesor} from '../../core/domain/Profesor';
import {Tutore} from '../../core/domain/Tutore';
import {setUserTokenThunk} from './setUserTokenThunk';
import {errorResponse} from '../../services/AxiosService';

interface Payload {
  token: string;
  payload: UserLogged;
}

export  const loginUserThunk = (userCredentials: LoginUserRequest)=> async(
  dispatch: Dispatch
)=>{
   try{
     dispatch(loginUserAction());

     const payload: Payload = await Context.apiService.loginUser(userCredentials);

     await setUserTokenThunk(payload.token)(dispatch);

     if(payload.payload.role === 'student') {
       const user=Student.createStudent(payload.payload);
       dispatch(loginUserSuccessAction(user));
       localStorage.setItem('user', user)
     } else {
       if(payload.payload.groupId) {
         const user = Tutore.createTutore(payload.payload);
         dispatch(loginUserSuccessAction(user));
         localStorage.setItem('user', user);
       } else {
         const user = Profesor.createProfesor(payload.payload);
         dispatch(loginUserSuccessAction(user));
         localStorage.setItem('user', user);
       }
     }

     await Context.routerService.push('/homepage/post');

   } catch(e) {
     dispatch(loginUserErrorAction(e));

     await Swal.fire({
       title: 'Error!',
       text: ` ${errorResponse.message} `,
       type: 'error',
       confirmButtonText: 'Ok',
       icon: 'error',
     })
   }
};
