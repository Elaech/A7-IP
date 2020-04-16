import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    getProfesoriAction,
    getProfesoriErrorAction,
    getProfesoriSuccessAction,
} from './profesorActions';

import {Context} from '../../Context';
import {errorResponse} from '../../services/AxiosService';
import type {UserToken} from '../User/tokenReducer';


export  const getProfesoriThunk = (authorizer: UserToken)=> async(
    dispatch: Dispatch
)=>{
    try{

        dispatch(getProfesoriAction());


        const payload = await Context.apiService.registerUser(authorizer);


        dispatch(getProfesoriSuccessAction(payload));
    } catch(e) {
        dispatch(getProfesoriErrorAction(e));

        await Swal.fire({
            title: 'Error!',
            text: ` ${errorResponse.status} `,
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
