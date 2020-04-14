import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    createPostAction,
    createPostSuccessAction,
    createPostErrorAction,
} from './postActions';

import {Context} from '../../Context';
import type { RegisterUserRequest } from '../../core/services/ApiService';
import type { UserLogged } from '../../../global';

export  const createAPostThunk = (messageContent:)=> async(
    dispatch: Dispatch
)=>{
    try{
        dispatch(createPostAction());

        const post: UserLogged = await Context.apiService.createPost(userCredentials);

        dispatch(createPostSuccessAction(post));
    } catch(e) {
        dispatch(createPostErrorAction(e));

        Swal.fire({
            title: 'Error!',
            text: 'There was an error on creating a post!',
            type: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
