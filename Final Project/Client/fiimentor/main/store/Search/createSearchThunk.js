import {Dispatch} from 'redux';
import Swal from 'sweetalert2';
import {
    createSearchAction,
    createSearchSuccessAction,
    createSearchErrorAction,
} from './SearcActions';

import {Context} from '../../Context';

export  const searchPostThunk = (searchReq)=> async(
    dispatch: Dispatch
)=>{
    try{
            const payload: Postare[];
     }catch(e) {
        dispatch(createSearchErrorAction(e));

       await Swal.fire({
            title: 'Error!',
            text: 'A aparut o eroare la cautare!',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
};
