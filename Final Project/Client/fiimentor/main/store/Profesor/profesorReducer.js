import {
    SET_INITIAL_STATE,
    SetInitialStateAction,
} from '../setInitialStateAction';

import {Profesor} from '../../core/domain/Profesor';
import {ProfesorActions} from './profesorActions';
import type {GetProfesoriSuccessAction} from './profesorActions';

type ActionType =
    | SetInitialStateAction
    | GetProfesoriSuccessAction;

export type ProfesoriState = Profesor[] | null;

const initialState: ProfesoriState = null;

export const profesoriReducer = (
    state: ProfesoriState = initialState,
    action: ActionType,
): ProfesoriState => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return initialState;
        case ProfesorActions.GET_PROFESORI_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
