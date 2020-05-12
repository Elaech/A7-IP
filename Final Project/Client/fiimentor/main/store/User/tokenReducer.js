import {
    SET_INITIAL_STATE,
    SetInitialStateAction,
} from '../setInitialStateAction';
import  {
    SetUserTokenAction,
    SetUserTokenErrorAction,
    SetUserTokenSuccessAction,
    UserActions
} from './userActions';


type ActionType =
    | SetInitialStateAction
    | SetUserTokenAction
    | SetUserTokenErrorAction
    | SetUserTokenSuccessAction;


export type UserToken = string | null;

const initialState: UserToken = null;

export const tokenReducer = (
    state: UserToken = initialState,
    action: ActionType,
): UserToken => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return initialState;
        case UserActions.SET_USER_TOKEN_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
