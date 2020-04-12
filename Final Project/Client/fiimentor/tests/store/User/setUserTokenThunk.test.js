import {Dispatch} from 'redux';
import {Context} from '../../../main/Context';

import {
    setUserTokenAction,
    setUserTokenErrorAction,
    setUserTokenSuccessAction,
} from '../../../main/store/User/userActions';
import {setUserTokenThunk} from '../../../main/store/User/setUserTokenThunk';

describe('SetUserTokenThunk',()=>{
    test('should set user token with success', async()=>{
        const userToken = 'userToken1213342423';

        const dispatch: Dispatch = jest.fn();

        await setUserTokenThunk(userToken)(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,setUserTokenAction());
        expect(dispatch).toHaveBeenNthCalledWith(2,setUserTokenSuccessAction(userToken));
    });

    test('should throw an error on settingUserThunk', async()=>{

        const dispatch: Dispatch = jest.fn();

        await setUserTokenThunk()(dispatch);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,setUserTokenAction());
        expect(dispatch).toHaveBeenNthCalledWith(2,setUserTokenErrorAction());
    })
});
