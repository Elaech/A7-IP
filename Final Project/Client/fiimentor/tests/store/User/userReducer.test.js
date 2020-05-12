import {
    SET_INITIAL_STATE,
    setInitialStateAction,
} from '../../../main/store/setInitialStateAction';

import {
    loginUserSuccessAction,
    registerUserSuccessAction,
    UserActions,
} from '../../../main/store/User/userActions';

import {
    userReducer,
    UserState,
} from '../../../main/store/User/userReducer';
import { User } from '../../../main/core/domain/User';

describe('userReducer', ()=>{
    test('should reduce the initial state', ()=> {
        const action = {};

        expect(userReducer(undefined,action)).toEqual(null);

    });

    test(`should reduce ${SET_INITIAL_STATE}`, ()=>{
        const user = User.create();

        const action = setInitialStateAction();

        expect(userReducer(user, action)).toEqual(null);

    });

    test(`should reduce ${UserActions.LOGIN_USER_SUCCESS}`,()=> {
        const initialState: UserState = null;

        const user = User.create({id:123});

        const action = loginUserSuccessAction(user);

        expect(userReducer(initialState, action)).toEqual(user);
    });

    test(`should reduce ${UserActions.REGISTER_USER_SUCCESS}`,()=> {
        const initialState: UserState = null;

        const user = User.create({id:123});

        const action = registerUserSuccessAction(user);

        expect(userReducer(initialState, action)).toEqual(user);
    });
})
