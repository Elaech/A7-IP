import {Dispatch} from 'redux';
import {Context} from '../../../main/Context';

import {loginUserAction, loginUserErrorAction, loginUserSuccessAction,} from '../../../main/store/User/userActions';
import {User} from '../../../main/core/domain/User';
import {loginUserThunk} from '../../../main/store/User/loginUserThunk';
import {LoginUserRequest} from '../../../main/core/services/ApiService';
import {setUserTokenThunk} from '../../../main/store/User/setUserTokenThunk';


describe('loginUserThunk', () => {
    const password = 'password';
    const username = 'username';
    const id = 123232;
    const email = 'email@mail.com';
    const firstName = 'firstName';
    const lastName = 'lastName';
    const serialNumber = '121ERER12232';
    const role = 'student';

    const user = User.create({
        id,
        serialNumber,
        username,
        firstName,
        lastName,
        email,
        role
    });


    const userCredentials: LoginUserRequest = {
        username,
        password,
    };

    const userToken = 'userToken';

    test('should dispatch the user info on login success', async () => {
        const dispatch: Dispatch = jest.fn();


        jest
            .spyOn(Context.apiService, 'loginUser')
            .mockReturnValue(Promise.resolve(user));

        await loginUserThunk(userCredentials)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, loginUserAction());
        expect(dispatch).toHaveBeenNthCalledWith(2,setUserTokenThunk(userToken));
        expect(dispatch).toHaveBeenNthCalledWith(3, loginUserSuccessAction(user));
        expect(Context.apiService.loginUser).toBeCalledWith(userCredentials);
    });

    test('should dispatch an error on login failure', async () => {
        const dispatch: Dispatch = jest.fn();


        jest
            .spyOn(Context.apiService, 'loginUser')
            .mockReturnValue(Promise.reject());

        await loginUserThunk(userCredentials)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, loginUserAction());
        expect(dispatch).toHaveBeenNthCalledWith(2, loginUserErrorAction());
        expect(Context.apiService.loginUser).toBeCalledWith(userCredentials);
    })
})
