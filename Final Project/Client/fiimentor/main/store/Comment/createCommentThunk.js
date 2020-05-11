import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    createCommentAction,
    createCommentSuccessAction,
    createCommentErrorAction,
} from './commentActions';

import {Context} from '../../Context';
import type {CreateCommentRequest} from '../../core/services/ApiService';


export  const createCommentThunk = (commentContent: CreateCommentRequest)=> async(
    dispatch: Dispatch
)=>{
    try{
        dispatch(createCommentAction());

        const comment = await Context.apiService.createComment(commentContent);
        console.log(comment);

        dispatch(createCommentSuccessAction());

        await Swal.fire({
            text: 'Comentariul a fost adaugat cu succes!',
            confirmButtonText: 'Ok',
        })
    } catch(e) {
        dispatch(createCommentErrorAction(e));

       await Swal.fire({
            text: 'A aparut o eroare la adaugarea comentariului.',
            confirmButtonText: 'Ok',
        })
    }
};
