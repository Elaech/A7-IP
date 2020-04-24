import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    createPostAction,
    createPostSuccessAction,
    createPostErrorAction,
} from './postActions';

import {Context} from '../../Context';
import type {CreatePostRequest} from '../../core/services/ApiService';


export  const createAPostThunk = (postContent: CreatePostRequest)=> async(
    dispatch: Dispatch
)=>{
    try{
        dispatch(createPostAction());

        const post = await Context.apiService.createPost(postContent);
        console.log(post);

        dispatch(createPostSuccessAction());

        await Swal.fire({
            title: 'Success!',
            text: 'Postare creata cu succes!',
            icon: 'success',
            confirmButtonText: 'Ok',
        })
    } catch(e) {
        dispatch(createPostErrorAction(e));

       await Swal.fire({
            title: 'Error!',
            text: 'A aparut o eroare la crearea unei postari!',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
