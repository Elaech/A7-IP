import { Dispatch } from 'redux';
import { Context } from '../../../main/Context';

import {
    updateUserAction,
    updateUserErrorAction,
    updateUserSuccessAction,
} from '../../../main/store/User/userActions';
import { User } from '../../../main/core/domain/User';
import { updateUserThunk } from '../../../main/store/User/updateUserThunk';
import { UpdateUserRequest } from '../../../main/core/services/ApiService';

describe('updateUserThunk', () => {
    const role = 'student';
    const year = '1';
    const number = '7';
    const letter = 'A';
    const academicRank = 'academicRank' ;
    const groupeTitle = 'titlu';

    const user = User.create({
        role,
        year,
        number,
        letter,
        academicRank,
        groupeTitle,
    });

    const userCredentials: UpdateUserRequest = {
        role,
        year,
        number,
        letter,
        academicRank,
        groupeTitle,
    };

    test('should dispatch the user info on update success', async () => {
        const dispatch: Dispatch = jest.fn();

        jest
            .spyOn(Context.apiService, 'updateUser')
            .mockReturnValue(Promise.resolve(user));

        await registerUserThunk(userCredentials)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, updateUserAction());
        expect(dispatch).toHaveBeenNthCalledWith(2, updateUserSuccessAction(user));
        expect(Context.apiService.updateUser).toBeCalledWith(userCredentials);
    });

    test('should dispatch an error on update failure', async () => {
        const dispatch: Dispatch = jest.fn();

        jest
            .spyOn(Context.apiService, 'updateUser')
            .mockReturnValue(Promise.reject());

        await updateUserThunk(userCredentials)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, updateUserAction());
        expect(dispatch).toHaveBeenNthCalledWith(2, updateUserErrorAction());
        expect(Context.apiService.updateUser).toBeCalledWith(userCredentials);
    })
})