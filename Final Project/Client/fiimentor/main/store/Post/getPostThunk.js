import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    getPostAction,
    getPostErrorAction,
    getPostSuccessAction,
} from './postActions';
import {Context} from '../../Context';
import {Postare} from '../../core/domain/Postare';

export const getPostThunk = (postId: number, postType: string, authorization:string)=> async (
    dispatch: Dispatch
) => {
    try {
        dispatch(getPostAction());

        const payload = postType ==='privateMessage' ?
            await Context.apiService.getPrivateMessage(postId, authorization)
            :
            await Context.apiService.getPost(postId,authorization);

        const postToCreate = {
            title: payload.title,
            content: payload.content,
            author: payload.author,
            timestamp: payload.timestamp,
            isAnonymous: payload.isAnonymous !== 0,
            comments: payload.comments
        };

        const post: Postare = Postare.create(postToCreate);

        dispatch(getPostSuccessAction(post));
    } catch(e) {
        dispatch(getPostErrorAction(e));


        await Swal.fire({
            title: 'Eroare!',
            text: 'A aparut o eroare la accesarea postarii!',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }
};
