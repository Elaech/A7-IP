import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {createCommentAction, createCommentErrorAction, createCommentSuccessAction,} from './commentActions';

import {Context} from '../../Context';
import type {CreateCommentRequest} from '../../core/services/ApiService';


export const createCommentThunk = (commentContent: CreateCommentRequest, authorizer: string) => async (
    dispatch: Dispatch
) => {
    try {
        dispatch(createCommentAction());

        await Context.apiService.createComment(commentContent, authorizer);

        dispatch(createCommentSuccessAction());

        await Swal.fire({
            icon: 'success',
            text: 'Comentariul a fost adaugat cu succes!',
            confirmButtonText: 'Ok',
        })
    } catch (e) {
        dispatch(createCommentErrorAction(e));

        await Swal.fire({
            icon: 'error',
            text: 'A aparut o eroare la adaugarea comentariului.',
            confirmButtonText: 'Ok',
        })
    }
};
