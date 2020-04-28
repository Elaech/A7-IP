import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    createSearchAction,
    createSearchSuccessAction,
    createSearchErrorAction,
} from './SearcActions';

import {Context} from '../../Context';

export  const createSearchThunk = (SearchContent)=> async(
    dispatch: Dispatch
)=>{
    try{
        dispatch(createSearchAction());

        const search = await Context.apiService.createPost(postContent);
        console.log(search);

        dispatch(createSearchSuccessAction());

        await Swal.fire({
            title: 'Success!',
            text: 'Ati cautat cu succes!',
            icon: 'success',
            confirmButtonText: 'Ok',
        })
    } catch(e) {
        dispatch(createSearchErrorAction(e));

       await Swal.fire({
            title: 'Error!',
            text: 'A aparut o eroare la cautare!',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
