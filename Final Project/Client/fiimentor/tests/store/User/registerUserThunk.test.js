import {Dispatch} from 'redux';
import { Context } from '../../../main/Context';

import {
  registerUserAction,
  registerUserSuccessAction,
  registerUserErrorAction,
} from '../../../main/store/User/userActions';
import { User } from '../../../main/core/domain/User';
import type { RegisterUserRequest } from '../../../main/core/services/ApiService';
import { registerUserThunk } from '../../../main/store/User/registerUserThunk';


describe('registerUserThunk', ()=>{
  const password = 'password';
  const username = 'username';
  const id = 123232;
  const email = 'email@mail.com';
  const firstName = 'firstName';
  const lastName = 'lastName';
  const serialNumber='121ERER12232';
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


  const userCredentials: RegisterUserRequest = {
    firstName,
    lastName,
    serialNumber,
    username,
    password,
    role,
    email,
  };

  test('should dispatch the user info on register success', async ()=>{
    const dispatch: Dispatch = jest.fn();

    jest
      .spyOn(Context.apiService, 'registerUser')
      .mockReturnValue(Promise.resolve(user));

    await registerUserThunk(userCredentials)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1,registerUserAction());
    expect(dispatch).toHaveBeenNthCalledWith(2,registerUserSuccessAction(user));
    expect(Context.apiService.registerUser).toBeCalledWith(userCredentials);
  });

  test('should dispatch an error on register failure', async ()=>{
    const dispatch: Dispatch = jest.fn();

    jest
      .spyOn(Context.apiService, 'registerUser')
      .mockReturnValue(Promise.reject());

    await registerUserThunk(userCredentials)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1,registerUserAction());
    expect(dispatch).toHaveBeenNthCalledWith(2,registerUserErrorAction());
    expect(Context.apiService.registerUser).toBeCalledWith(userCredentials);
  })
})
