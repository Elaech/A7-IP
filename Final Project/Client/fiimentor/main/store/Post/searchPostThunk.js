import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    searchPostAction,
    searchPostErrorAction,
    searchPostSuccessAction,
} from './searchPostsActions';

import {Context} from '../../Context';
import type {SearchRequest} from '../../core/services/ApiService';
import {Postare} from '../../core/domain/Postare';

export const searchPostThunk = (searchReq: SearchRequest, authorization: string) => async (
    dispatch: Dispatch
) => {
    try {

        dispatch(searchPostAction());

        const payload = await Context.apiService.searchPost(searchReq, authorization);
        const posts = payload.posts.map((value)=>{
            const post: Postare = {
                id: value.pmessageId || value.postId,
                type: value.pmessageId? 'privateMessage': 'post',
                title: value.title,
                timestamp: value.timestamp,
                author: value.author,
                content: value.content,
                isAnonymous: value.isAnonymous,
            };
            return new Postare(post);
        });
        const total = payload.totalPosts;

        const searchedPosts = {
            posts,
            total
        };

        dispatch(searchPostSuccessAction(searchedPosts));
    } catch (e) {
        dispatch(searchPostErrorAction(e));

        await Swal.fire({
            title: 'Eroare!',
            text: 'A aparut o eroare la primirea postarilor!',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
