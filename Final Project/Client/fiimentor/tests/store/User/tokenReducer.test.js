import {
    SET_INITIAL_STATE,
    setInitialStateAction,
} from '../../../main/store/setInitialStateAction';

import {
    setUserTokenSuccessAction,
    UserActions,
} from '../../../main/store/User/userActions';

import {
    tokenReducer,
    UserToken
} from '../../../main/store/User/tokenReducer';

describe('tokenReducer', ()=> {
    test('should reduce the initial state', () => {
        const action = {};

        expect(tokenReducer(undefined, action)).toEqual(null);

    });

    test(`should reduce ${SET_INITIAL_STATE}`, () => {

        const token = '';
        const action = setInitialStateAction();

        expect(tokenReducer(token, action)).toEqual(null);

    });

    test(`should reduce ${UserActions.SET_USER_TOKEN_SUCCESS}`, () => {
        const initialState: UserToken = null;

        const token = 'token';

        const action = setUserTokenSuccessAction(token);

        expect(tokenReducer(initialState, action)).toEqual(token);
    });
});
