import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {searchPostAction, searchPostErrorAction, searchPostSuccessAction,} from './searchActions';

import {Context} from '../../Context';
import type {SearchRequest} from '../../core/services/ApiService';

export const searchPostThunk = (searchReq: SearchRequest, authorization: string) => async (
    dispatch: Dispatch
) => {
    try {

        dispatch(searchPostAction());

        const payload = await Context.apiService.searchPost(searchReq, authorization);

        dispatch(searchPostSuccessAction(payload));
    } catch (e) {
        dispatch(searchPostErrorAction(e));

        await Swal.fire({
            title: 'Error!',
            text: 'A aparut o eroare la primirea postarilor!',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
