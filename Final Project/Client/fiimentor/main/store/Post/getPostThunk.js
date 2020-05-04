import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    getPostAction,
    getPostErrorAction,
    getPostSuccessAction,
} from './postActions';
import {Context} from '../../Context';

export const getPostThunk = (postId: number, postType: string, authorization:string)=> async (
    dispatch: Dispatch
) => {
    try {
        dispatch(getPostAction());

        const post = postType ==='privateMessage' ?
            await Context.apiService.getPrivateMessage(postId, authorization)
            :
            await Context.apiService.getPost(postId,authorization);
       console.log(post);

        dispatch(getPostSuccessAction(post));
    } catch(e) {
        dispatch(getPostErrorAction(e));


        await Swal.fire({
            title: 'Error!',
            text: 'A aparut o eroare la accesarea postarii!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }
};
