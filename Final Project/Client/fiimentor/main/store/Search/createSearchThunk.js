import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {createSearchAction, createSearchErrorAction, createSearchSuccessAction,} from './SearchActions';

import {Context} from '../../Context';
import {Postare} from '../../core/domain/Postare';

export const searchPostThunk = (searchReq) => async (
    dispatch: Dispatch
) => {
    try {

        dispatch(createSearchAction());

        const payload: Postare[] = await Context.apiService.searchPost(searchReq);

        dispatch(createSearchSuccessAction(payload));
    } catch (e) {
        dispatch(createSearchErrorAction(e));

        await Swal.fire({
            title: 'Error!',
            text: 'A aparut o eroare la cautare!',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
