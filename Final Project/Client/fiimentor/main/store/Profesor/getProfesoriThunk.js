import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    getProfesoriAction,
    getProfesoriErrorAction,
    getProfesoriSuccessAction,
} from './profesorActions';

import {Context} from '../../Context';
import {errorResponse} from '../../services/AxiosService';
import {Profesor} from '../../core/domain/Profesor';


export  const getProfesoriThunk = (authorizer: string)=> async(
    dispatch: Dispatch
)=>{
    try{

        dispatch(getProfesoriAction());


        const payload = await Context.apiService.getProfesori(authorizer);

        dispatch(getProfesoriSuccessAction(payload.professorsArray.map(value => Profesor.createProfesor({
            firstName: value.FirstName,
            lastName: value.LastName,
            id: value.UserId,
            professorId: value.id,
        }))));
    } catch(e) {
        dispatch(getProfesoriErrorAction(e));

        await Swal.fire({
            title: 'Eroare!',
            text: ` ${errorResponse} `,
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
